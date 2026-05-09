package com.expensetracker.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {
    private JwtService jwtService;

    @BeforeEach
    void setup() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "jwtSecret", "VGhpc0lzQVNlY3VyZUFuZExvbmdCYXNlNjRLZXlGb3JKV1QxMjM0NTY3ODkw");
        ReflectionTestUtils.setField(jwtService, "expirationMs", 3600000L);
    }

    @Test
    void tokenShouldContainUsername() {
        String token = jwtService.generateToken("deepu");
        assertTrue(jwtService.isValid(token));
        assertEquals("deepu", jwtService.extractUsername(token));
    }
}
