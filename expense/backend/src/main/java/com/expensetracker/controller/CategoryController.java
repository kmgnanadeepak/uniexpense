package com.expensetracker.controller;

import com.expensetracker.entity.Category;
import com.expensetracker.service.CategoryService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> all() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<Category> add(@RequestBody CategoryCreateRequest request) {
        return ResponseEntity.ok(categoryService.add(request.getName()));
    }

    @Data
    public static class CategoryCreateRequest {
        private String name;
    }
}
