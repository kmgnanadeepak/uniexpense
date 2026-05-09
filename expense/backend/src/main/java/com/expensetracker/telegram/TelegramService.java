package com.expensetracker.telegram;

import com.expensetracker.dto.TelegramMessageDTO;
import com.expensetracker.dto.TransactionRequest;
import com.expensetracker.entity.TelegramLog;
import com.expensetracker.entity.Transaction;
import com.expensetracker.entity.User;
import com.expensetracker.exception.BadRequestException;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.repository.TelegramLogRepository;
import com.expensetracker.repository.TransactionRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TelegramService {
    private static final Logger log = LoggerFactory.getLogger(TelegramService.class);
    private final TelegramParserService parserService;
    private final TelegramLogRepository telegramLogRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public Map<String, Object> webhook(TelegramMessageDTO dto) {
        log.info("STEP 1: Telegram webhook entered");
        if (dto == null || dto.getUsername() == null || dto.getUsername().isBlank()
                || dto.getMessage() == null || dto.getMessage().isBlank()) {
            throw new BadRequestException("Invalid telegram payload");
        }

        User user = null;
        try {
            /*
             * Telegram webhooks are external callbacks and do not carry JWT from our app users.
             * So this flow must not depend on SecurityUtils/getCurrentUser() and instead map the
             * target user directly from Telegram username.
             */
            user = userRepository.findByUsername(dto.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("Telegram username not linked"));
            log.info("STEP 2: Telegram user mapped for username={}", dto.getUsername());

            String incomingMessage = dto.getMessage().trim();
            if ("/start".equalsIgnoreCase(incomingMessage)) {
                log.info("STEP 3: Telegram command detected: /start");
                String reply = "Welcome to Expense Tracker Bot!\n"
                        + "Send expenses like:\n"
                        + "- Spent 250 on food\n"
                        + "- spent 650 for petrol\n"
                        + "- paid 500 for fuel\n"
                        + "- lunch 300\n"
                        + "- groceries 1200";
                saveTelegramLog(user, incomingMessage, "COMMAND", "/start command handled");
                log.info("STEP 7: Response returned for /start");
                return Map.of("status", "ok", "message", reply);
            }

            if ("/help".equalsIgnoreCase(incomingMessage)) {
                log.info("STEP 3: Telegram command detected: /help");
                String reply = "Supported expense formats:\n"
                        + "- Spent 250 on food\n"
                        + "- spent 650 for petrol\n"
                        + "- movie 450\n"
                        + "- paid 500 for fuel\n"
                        + "- lunch 300\n"
                        + "- groceries 1200";
                saveTelegramLog(user, incomingMessage, "COMMAND", "/help command handled");
                log.info("STEP 7: Response returned for /help");
                return Map.of("status", "ok", "message", reply);
            }

            /*
             * Parser flow:
             * 1) Extract amount with robust case-insensitive regex
             * 2) Normalize category by keyword mapping
             * 3) Build a clean note from remaining message text
             */
            TransactionRequest parsed = parserService.parse(incomingMessage);
            log.info("STEP 3: Message parsed");
            if (parsed == null) {
                saveTelegramLog(user, incomingMessage, "FAILED", "Could not understand expense format.");
                return Map.of("status", "ignored", "message", "Could not understand expense format.");
            }

            /*
             * Transaction flow:
             * Build entity from parsed Telegram expense and mapped user,
             * then persist explicitly so webhook does not depend on auth context.
             */
            Transaction transaction = Transaction.builder()
                    .user(user)
                    .amount(parsed.getAmount())
                    .type(parsed.getType())
                    .category(parsed.getCategory())
                    .note(parsed.getNote())
                    .paymentMode(parsed.getPaymentMode())
                    .source(parsed.getSource())
                    .timestamp(parsed.getTimestamp() == null ? LocalDateTime.now() : parsed.getTimestamp())
                    .build();
            log.info("STEP 4: Transaction entity created");

            log.info("STEP 5: Saving transaction to database");
            Transaction saved = transactionRepository.save(transaction);
            log.info("STEP 6: Transaction saved successfully with id={}", saved.getId());

            saveTelegramLog(user, incomingMessage, "SUCCESS", "Transaction created");

            DecimalFormat amountFormatter = new DecimalFormat("#,##0.##");
            String confirmation = "✅ Expense Added\n"
                    + "Amount: ₹" + amountFormatter.format(saved.getAmount()) + "\n"
                    + "Category: " + saved.getCategory();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("status", "processed");
            response.put("source", "TELEGRAM");
            response.put("transactionId", saved.getId());
            response.put("message", confirmation);
            log.info("STEP 7: Response returned");
            return response;
        } catch (RuntimeException ex) {
            log.error("Telegram webhook processing failed for username={}", dto.getUsername(), ex);
            if (user != null) {
                saveTelegramLog(user, dto.getMessage(), "FAILED", ex.getMessage());
            }
            throw ex;
        }
    }

    public Map<String, Object> status() {
        return Map.of("connected", true, "bot", "@FinTrackBot", "mode", "webhook");
    }

    public List<TelegramLog> history(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return telegramLogRepository.findTop20ByUserOrderByCreatedAtDesc(user);
    }

    private void saveTelegramLog(User user, String rawMessage, String status, String details) {
        telegramLogRepository.save(TelegramLog.builder()
                .user(user)
                .rawMessage(rawMessage)
                .parseStatus(status)
                .parseDetails(details)
                .build());
    }
}
