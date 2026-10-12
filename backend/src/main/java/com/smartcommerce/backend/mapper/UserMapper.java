package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.UserRequest;
import com.smartcommerce.backend.dto.UserResponse;
import com.smartcommerce.backend.entity.User;
import com.smartcommerce.backend.enums.Role;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserMapper {

    public User toEntity(UserRequest request) {

        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Role.MANAGER)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public UserResponse toResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
        /*}*/
    }
}
