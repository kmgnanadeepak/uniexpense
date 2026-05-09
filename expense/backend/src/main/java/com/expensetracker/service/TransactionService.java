package com.expensetracker.service;

import com.expensetracker.dto.TransactionRequest;
import com.expensetracker.dto.TransactionResponse;
import com.expensetracker.entity.Transaction;
import com.expensetracker.entity.User;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.repository.TransactionRepository;
import com.expensetracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final SecurityUtils securityUtils;

    public TransactionResponse add(TransactionRequest request) {
        User user = securityUtils.getCurrentUser();
        Transaction tx = Transaction.builder()
                .user(user)
                .amount(request.getAmount())
                .type(request.getType())
                .category(request.getCategory())
                .note(request.getNote())
                .paymentMode(request.getPaymentMode())
                .source(request.getSource())
                .timestamp(request.getTimestamp() == null ? LocalDateTime.now() : request.getTimestamp())
                .build();
        return toResponse(transactionRepository.save(tx));
    }

    public Page<TransactionResponse> all(int page, int size, String sortBy, String direction) {
        User user = securityUtils.getCurrentUser();
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return transactionRepository.findByUser(user, pageable).map(this::toResponse);
    }

    public TransactionResponse getById(Long id) {
        User user = securityUtils.getCurrentUser();
        Transaction tx = transactionRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return toResponse(tx);
    }

    public TransactionResponse update(Long id, TransactionRequest request) {
        User user = securityUtils.getCurrentUser();
        Transaction tx = transactionRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        tx.setAmount(request.getAmount());
        tx.setType(request.getType());
        tx.setCategory(request.getCategory());
        tx.setNote(request.getNote());
        tx.setPaymentMode(request.getPaymentMode());
        tx.setSource(request.getSource());
        tx.setTimestamp(request.getTimestamp() == null ? tx.getTimestamp() : request.getTimestamp());
        return toResponse(transactionRepository.save(tx));
    }

    public void delete(Long id) {
        User user = securityUtils.getCurrentUser();
        Transaction tx = transactionRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        transactionRepository.delete(tx);
    }

    public Page<TransactionResponse> search(String query, int page, int size) {
        User user = securityUtils.getCurrentUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        return transactionRepository.findByUserAndNoteContainingIgnoreCase(user, query, pageable).map(this::toResponse);
    }

    public Page<TransactionResponse> filter(String category, int page, int size) {
        User user = securityUtils.getCurrentUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        return transactionRepository.findByUserAndCategoryContainingIgnoreCase(user, category, pageable).map(this::toResponse);
    }

    public List<TransactionResponse> historyGroupedByDate() {
        return all(0, 200, "timestamp", "DESC").getContent();
    }

    private TransactionResponse toResponse(Transaction tx) {
        return TransactionResponse.builder()
                .id(tx.getId())
                .amount(tx.getAmount())
                .type(tx.getType())
                .category(tx.getCategory())
                .note(tx.getNote())
                .paymentMode(tx.getPaymentMode())
                .source(tx.getSource())
                .timestamp(tx.getTimestamp())
                .build();
    }
}
