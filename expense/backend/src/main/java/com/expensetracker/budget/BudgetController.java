package com.expensetracker.budget;

import com.expensetracker.dto.BudgetRequest;
import com.expensetracker.dto.BudgetStatusResponse;
import com.expensetracker.entity.Budget;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;

    @PostMapping("/set")
    public ResponseEntity<Budget> set(@Valid @RequestBody BudgetRequest request) {
        return ResponseEntity.ok(budgetService.set(request));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Budget>> all() {
        return ResponseEntity.ok(budgetService.all());
    }

    @GetMapping("/status")
    public ResponseEntity<List<BudgetStatusResponse>> status() {
        return ResponseEntity.ok(budgetService.status());
    }

    @PutMapping("/update")
    public ResponseEntity<Budget> update(@Valid @RequestBody BudgetRequest request) {
        return ResponseEntity.ok(budgetService.set(request));
    }
}
