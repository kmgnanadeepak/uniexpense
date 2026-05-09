package com.expensetracker.analytics;

import com.expensetracker.dto.AnalyticsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    @GetMapping("/api/analytics/monthly")
    public ResponseEntity<AnalyticsResponse> monthly() {
        return ResponseEntity.ok(analyticsService.monthly());
    }

    @GetMapping("/api/analytics/category")
    public ResponseEntity<Map<String, BigDecimal>> category() {
        return ResponseEntity.ok(analyticsService.category());
    }

    @GetMapping("/api/analytics/savings")
    public ResponseEntity<Map<String, BigDecimal>> savings() {
        return ResponseEntity.ok(analyticsService.savingsTrend());
    }

    @GetMapping("/api/dashboard/summary")
    public ResponseEntity<AnalyticsResponse> dashboardSummary() {
        return ResponseEntity.ok(analyticsService.dashboardSummary());
    }
}
