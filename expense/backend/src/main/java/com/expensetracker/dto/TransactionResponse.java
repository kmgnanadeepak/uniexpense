package com.expensetracker.dto;

import com.expensetracker.entity.TransactionSource;
import com.expensetracker.entity.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponse {
    private Long id;
    private BigDecimal amount;
    private TransactionType type;
    private String category;
    private String note;
    private String paymentMode;
    private TransactionSource source;
    private LocalDateTime timestamp;
}
