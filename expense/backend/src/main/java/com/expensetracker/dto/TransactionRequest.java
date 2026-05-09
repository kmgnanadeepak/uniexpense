package com.expensetracker.dto;

import com.expensetracker.entity.TransactionSource;
import com.expensetracker.entity.TransactionType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionRequest {
    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal amount;
    @NotNull
    private TransactionType type;
    @NotBlank
    private String category;
    private String note;
    private String paymentMode;
    private TransactionSource source = TransactionSource.MANUAL;
    private LocalDateTime timestamp;
}
