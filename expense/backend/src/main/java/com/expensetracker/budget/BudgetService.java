package com.expensetracker.budget;

import com.expensetracker.dto.BudgetRequest;
import com.expensetracker.dto.BudgetStatusResponse;
import com.expensetracker.entity.Budget;
import com.expensetracker.entity.TransactionType;
import com.expensetracker.entity.User;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.TransactionRepository;
import com.expensetracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final SecurityUtils securityUtils;

    public Budget set(BudgetRequest request) {
        User user = securityUtils.getCurrentUser();
        Budget budget = budgetRepository.findByUserAndCategoryIgnoreCase(user, request.getCategory())
                .orElse(Budget.builder().user(user).category(request.getCategory()).build());
        budget.setMonthlyLimit(request.getMonthlyLimit());
        return budgetRepository.save(budget);
    }

    public List<Budget> all() {
        return budgetRepository.findByUser(securityUtils.getCurrentUser());
    }

    public List<BudgetStatusResponse> status() {
        User user = securityUtils.getCurrentUser();
        LocalDateTime start = LocalDateTime.now().withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime end = LocalDateTime.now().withDayOfMonth(LocalDateTime.now().toLocalDate().lengthOfMonth()).toLocalDate().atTime(23, 59, 59);

        return budgetRepository.findByUser(user).stream().map(budget -> {
            BigDecimal spent = transactionRepository
                    .findByUserAndTypeAndTimestampBetween(user, TransactionType.DEBIT, start, end)
                    .stream()
                    .filter(tx -> tx.getCategory().equalsIgnoreCase(budget.getCategory()))
                    .map(tx -> tx.getAmount())
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal remaining = budget.getMonthlyLimit().subtract(spent);
            return BudgetStatusResponse.builder()
                    .category(budget.getCategory())
                    .monthlyLimit(budget.getMonthlyLimit())
                    .spentAmount(spent)
                    .remainingAmount(remaining)
                    .build();
        }).toList();
    }
}
