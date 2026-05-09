package com.expensetracker.analytics;

import com.expensetracker.dto.AnalyticsResponse;
import com.expensetracker.entity.Transaction;
import com.expensetracker.entity.TransactionType;
import com.expensetracker.entity.User;
import com.expensetracker.repository.TransactionRepository;
import com.expensetracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    private final TransactionRepository transactionRepository;
    private final SecurityUtils securityUtils;

    public AnalyticsResponse monthly() {
        User user = securityUtils.getCurrentUser();
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).atTime(23, 59, 59);
        List<Transaction> txs = transactionRepository.findByUserAndTimestampBetween(user, start, end);
        return summarize(txs);
    }

    public Map<String, BigDecimal> category() {
        User user = securityUtils.getCurrentUser();
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).atTime(23, 59, 59);
        return transactionRepository.findByUserAndTypeAndTimestampBetween(user, TransactionType.DEBIT, start, end)
                .stream()
                .collect(LinkedHashMap::new, (map, tx) -> map.merge(tx.getCategory(), tx.getAmount(), BigDecimal::add), Map::putAll);
    }

    public Map<String, BigDecimal> savingsTrend() {
        User user = securityUtils.getCurrentUser();
        Map<String, BigDecimal> trend = new LinkedHashMap<>();
        for (int i = 5; i >= 0; i--) {
            YearMonth ym = YearMonth.now().minusMonths(i);
            LocalDateTime start = ym.atDay(1).atStartOfDay();
            LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59);
            List<Transaction> txs = transactionRepository.findByUserAndTimestampBetween(user, start, end);
            BigDecimal income = txs.stream().filter(t -> t.getType() == TransactionType.CREDIT).map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal expense = txs.stream().filter(t -> t.getType() == TransactionType.DEBIT).map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            trend.put(ym.toString(), income.subtract(expense));
        }
        return trend;
    }

    public AnalyticsResponse dashboardSummary() {
        User user = securityUtils.getCurrentUser();
        List<Transaction> txs = transactionRepository.findByUserAndTimestampBetween(
                user,
                LocalDate.now().minusMonths(1).withDayOfMonth(1).atStartOfDay(),
                LocalDateTime.now()
        );
        return summarize(txs);
    }

    private AnalyticsResponse summarize(List<Transaction> txs) {
        BigDecimal income = txs.stream().filter(t -> t.getType() == TransactionType.CREDIT).map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal expense = txs.stream().filter(t -> t.getType() == TransactionType.DEBIT).map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        Map<String, BigDecimal> breakdown = txs.stream()
                .filter(t -> t.getType() == TransactionType.DEBIT)
                .collect(LinkedHashMap::new, (map, tx) -> map.merge(tx.getCategory(), tx.getAmount(), BigDecimal::add), Map::putAll);
        return AnalyticsResponse.builder()
                .totalIncome(income)
                .totalExpense(expense)
                .savings(income.subtract(expense))
                .categoryBreakdown(breakdown)
                .build();
    }
}
