package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.RegisterRequest;
import com.smartcommerce.backend.dto.response.RegisterResponse;
import com.smartcommerce.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.smartcommerce.backend.dto.request.LoginRequest;
import com.smartcommerce.backend.dto.response.LoginResponse;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public RegisterResponse register(@Valid @RequestBody RegisterRequest request) {

        return authService.register(request);



    }
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return authService.login(request);

    }

}