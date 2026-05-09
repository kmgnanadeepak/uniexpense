package com.expensetracker.repository;

import com.expensetracker.entity.Transaction;
import com.expensetracker.entity.TransactionType;
import com.expensetracker.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByUser(User user, Pageable pageable);
    Optional<Transaction> findByIdAndUser(Long id, User user);
    List<Transaction> findByUserAndTimestampBetween(User user, LocalDateTime start, LocalDateTime end);
    List<Transaction> findByUserAndTypeAndTimestampBetween(User user, TransactionType type, LocalDateTime start, LocalDateTime end);
    Page<Transaction> findByUserAndCategoryContainingIgnoreCase(User user, String category, Pageable pageable);
    Page<Transaction> findByUserAndNoteContainingIgnoreCase(User user, String note, Pageable pageable);
}
