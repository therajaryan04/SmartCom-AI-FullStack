package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.UserRequest;
import com.smartcommerce.backend.dto.UserResponse;
import com.smartcommerce.backend.entity.User;
import com.smartcommerce.backend.enums.Role;
import com.smartcommerce.backend.repository.UserRepository;
import com.smartcommerce.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

import com.smartcommerce.backend.mapper.UserMapper;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = userMapper.toEntity(request);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole(Role.MANAGER);

        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        throw new UnsupportedOperationException("Coming in next lesson");
    }

    @Override
    public UserResponse getUserById(Long id) {
        throw new UnsupportedOperationException("Coming in next lesson");
    }

    @Override
    public void deleteUser(Long id) {
        throw new UnsupportedOperationException("Coming in next lesson");
    }
}