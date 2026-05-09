package com.expensetracker.telegram;

import com.expensetracker.dto.TelegramMessageDTO;
import com.expensetracker.dto.TelegramUpdateDTO;
import com.expensetracker.entity.TelegramLog;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/telegram")
@RequiredArgsConstructor
public class TelegramController {
    private static final Logger log = LoggerFactory.getLogger(TelegramController.class);
    private final TelegramService telegramService;

    @PostMapping("/webhook")
    public ResponseEntity<?> webhook(@RequestBody TelegramUpdateDTO update) {
        /*
         * Telegram webhook payloads are nested update objects, unlike our internal
         * TelegramMessageDTO that directly stores username + message.
         */
        if (update == null
                || update.getMessage() == null
                || update.getMessage().getFrom() == null
                || update.getMessage().getText() == null
                || update.getMessage().getText().isBlank()
                || update.getMessage().getFrom().getUsername() == null
                || update.getMessage().getFrom().getUsername().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid telegram payload");
        }

        String username = update.getMessage().getFrom().getUsername();
        String text = update.getMessage().getText();

        // Console log for webhook debugging and payload verification.
        log.info("Telegram webhook received from username='{}' message='{}'", username, text);

        TelegramMessageDTO request = new TelegramMessageDTO();
        request.setUsername(username);
        request.setMessage(text);

        return ResponseEntity.ok(telegramService.webhook(request));
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        return ResponseEntity.ok(telegramService.status());
    }

    @GetMapping("/history")
    public ResponseEntity<List<TelegramLog>> history(@RequestParam String username) {
        return ResponseEntity.ok(telegramService.history(username));
    }
}
