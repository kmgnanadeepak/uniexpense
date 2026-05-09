package com.expensetracker.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "telegram_logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TelegramLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 512)
    private String rawMessage;

    @Column(length = 100)
    private String parseStatus;

    @Column(length = 255)
    private String parseDetails;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
