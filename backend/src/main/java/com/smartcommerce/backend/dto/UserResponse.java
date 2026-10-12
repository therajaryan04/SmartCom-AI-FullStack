package com.smartcommerce.backend.dto;

import com.smartcommerce.backend.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;

    private LocalDateTime createdAt;
}