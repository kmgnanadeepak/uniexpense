package com.expensetracker.service;

import com.expensetracker.entity.Category;
import com.expensetracker.entity.User;
import com.expensetracker.exception.BadRequestException;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final SecurityUtils securityUtils;

    public List<Category> getAll() {
        User user = securityUtils.getCurrentUser();
        return categoryRepository.findByUserIsNullOrUser(user);
    }

    public Category add(String name) {
        User user = securityUtils.getCurrentUser();
        categoryRepository.findByNameIgnoreCaseAndUser(name, user).ifPresent(existing -> {
            throw new BadRequestException("Category already exists");
        });
        return categoryRepository.save(Category.builder().name(name).user(user).build());
    }
}
