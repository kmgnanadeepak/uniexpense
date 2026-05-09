package com.expensetracker.repository;

import com.expensetracker.entity.TelegramLog;
import com.expensetracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TelegramLogRepository extends JpaRepository<TelegramLog, Long> {
    List<TelegramLog> findTop20ByUserOrderByCreatedAtDesc(User user);
}
