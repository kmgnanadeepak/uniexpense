package com.expensetracker.dto;

import lombok.Data;

@Data
public class TelegramUpdateDTO {
    /*
     * Telegram sends webhook payloads as nested "update" objects.
     * This DTO mirrors Telegram's message -> from/text structure so we can safely
     * parse webhook JSON before mapping to our internal TelegramMessageDTO.
     */
    private Message message;

    @Data
    public static class Message {
        private From from;
        private String text;
    }

    @Data
    public static class From {
        private String username;
    }
}
