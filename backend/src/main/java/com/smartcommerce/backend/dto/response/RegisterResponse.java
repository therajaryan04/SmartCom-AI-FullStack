package com.smartcommerce.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String message;
}