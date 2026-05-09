package com.expensetracker.service;

import com.expensetracker.dto.*;
import com.expensetracker.entity.User;
import com.expensetracker.exception.BadRequestException;
import com.expensetracker.repository.UserRepository;
import com.expensetracker.security.JwtService;
import com.expensetracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SecurityUtils securityUtils;

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .currency(request.getCurrency())
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user.getUsername());
        return AuthResponse.builder().token(token).username(user.getUsername()).email(user.getEmail()).currency(user.getCurrency()).build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        String token = jwtService.generateToken(user.getUsername());
        return AuthResponse.builder().token(token).username(user.getUsername()).email(user.getEmail()).currency(user.getCurrency()).build();
    }

    public ProfileResponse getProfile() {
        User user = securityUtils.getCurrentUser();
        return ProfileResponse.builder().id(user.getId()).username(user.getUsername()).email(user.getEmail()).currency(user.getCurrency()).build();
    }

    public ProfileResponse updateProfile(ProfileUpdateRequest request) {
        User user = securityUtils.getCurrentUser();
        user.setEmail(request.getEmail());
        user.setCurrency(request.getCurrency());
        userRepository.save(user);
        return getProfile();
    }

    public void changePassword(ChangePasswordRequest request) {
        User user = securityUtils.getCurrentUser();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
