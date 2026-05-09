package com.expensetracker.service;

import com.expensetracker.dto.SignupRequest;
import com.expensetracker.entity.User;
import com.expensetracker.repository.UserRepository;
import com.expensetracker.security.JwtService;
import com.expensetracker.util.SecurityUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtService jwtService;
    @Mock private SecurityUtils securityUtils;

    @InjectMocks private AuthService authService;

    @Test
    void signupShouldReturnToken() {
        SignupRequest request = new SignupRequest();
        request.setUsername("deepu");
        request.setPassword("secret123");
        request.setEmail("deepu@gmail.com");
        request.setCurrency("INR");

        when(userRepository.existsByUsername("deepu")).thenReturn(false);
        when(userRepository.existsByEmail("deepu@gmail.com")).thenReturn(false);
        when(passwordEncoder.encode("secret123")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtService.generateToken("deepu")).thenReturn("jwt-token");

        var response = authService.signup(request);
        assertEquals("jwt-token", response.getToken());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
