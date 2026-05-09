package com.expensetracker.config;

import com.expensetracker.entity.Category;
import com.expensetracker.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) {
        List<String> defaults = List.of("Food", "Rent", "Fuel", "Shopping", "Bills", "Salary", "Health", "Entertainment", "Education", "Investment");
        for (String name : defaults) {
            boolean exists = categoryRepository.findAll().stream().anyMatch(c -> c.getUser() == null && c.getName().equalsIgnoreCase(name));
            if (!exists) {
                categoryRepository.save(Category.builder().name(name).build());
            }
        }
    }
}
