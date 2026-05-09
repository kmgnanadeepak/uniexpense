package com.expensetracker.telegram;

import com.expensetracker.dto.TransactionRequest;
import com.expensetracker.entity.TransactionSource;
import com.expensetracker.entity.TransactionType;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TelegramParserService {
    private static final Pattern AMOUNT_PATTERN = Pattern.compile("(\\d+(?:\\.\\d{1,2})?)", Pattern.CASE_INSENSITIVE);
    private static final Pattern EXTRA_SPACE_PATTERN = Pattern.compile("\\s+");
    private static final Pattern CLEANUP_WORDS_PATTERN = Pattern.compile(
            "\\b(spent|spend|paid|pay|on|for|inr|rs\\.?|rupees?)\\b",
            Pattern.CASE_INSENSITIVE
    );
    private static final LinkedHashMap<Pattern, String> CATEGORY_RULES = new LinkedHashMap<>();

    static {
        CATEGORY_RULES.put(Pattern.compile("\\b(petrol|fuel|diesel)\\b", Pattern.CASE_INSENSITIVE), "FUEL");
        CATEGORY_RULES.put(Pattern.compile("\\b(food|lunch|dinner|breakfast|meal|groceries?)\\b", Pattern.CASE_INSENSITIVE), "FOOD");
        CATEGORY_RULES.put(Pattern.compile("\\b(movie|movies|cinema)\\b", Pattern.CASE_INSENSITIVE), "ENTERTAINMENT");
        CATEGORY_RULES.put(Pattern.compile("\\b(rent|house\\s?rent)\\b", Pattern.CASE_INSENSITIVE), "RENT");
        CATEGORY_RULES.put(Pattern.compile("\\b(shopping|shop|purchase)\\b", Pattern.CASE_INSENSITIVE), "SHOPPING");
        CATEGORY_RULES.put(Pattern.compile("\\b(bill|bills|electricity|water|internet)\\b", Pattern.CASE_INSENSITIVE), "BILLS");
        CATEGORY_RULES.put(Pattern.compile("\\b(health|medical|medicine|doctor|hospital)\\b", Pattern.CASE_INSENSITIVE), "HEALTH");
        CATEGORY_RULES.put(Pattern.compile("\\b(education|fees?|course|books?)\\b", Pattern.CASE_INSENSITIVE), "EDUCATION");
        CATEGORY_RULES.put(Pattern.compile("\\b(travel|cab|taxi|bus|train|flight)\\b", Pattern.CASE_INSENSITIVE), "TRAVEL");
    }

    public TransactionRequest parse(String message) {
        if (message == null || message.isBlank()) {
            return null;
        }

        String normalizedMessage = EXTRA_SPACE_PATTERN.matcher(message.trim()).replaceAll(" ");
        Matcher matcher = AMOUNT_PATTERN.matcher(normalizedMessage);
        if (!matcher.find()) {
            return null;
        }

        BigDecimal amount = new BigDecimal(matcher.group(1));
        String category = detectCategory(normalizedMessage);
        String note = buildNote(normalizedMessage, matcher.group(1));

        TransactionRequest request = new TransactionRequest();
        request.setAmount(amount);
        request.setType(TransactionType.DEBIT);
        request.setCategory(category);
        request.setNote(note);
        request.setPaymentMode("TELEGRAM");
        request.setSource(TransactionSource.TELEGRAM);
        request.setTimestamp(LocalDateTime.now());
        return request;
    }

    private String detectCategory(String message) {
        for (Map.Entry<Pattern, String> entry : CATEGORY_RULES.entrySet()) {
            if (entry.getKey().matcher(message).find()) {
                return entry.getValue();
            }
        }
        return "OTHER";
    }

    private String buildNote(String message, String extractedAmount) {
        String withoutAmount = message.replaceFirst(Pattern.quote(extractedAmount), " ");
        String cleaned = CLEANUP_WORDS_PATTERN.matcher(withoutAmount).replaceAll(" ");
        cleaned = EXTRA_SPACE_PATTERN.matcher(cleaned.trim()).replaceAll(" ");
        return cleaned.isBlank() ? message : cleaned;
    }
}
