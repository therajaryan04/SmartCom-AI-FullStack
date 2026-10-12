package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.UserRequest;
import com.smartcommerce.backend.dto.UserResponse;
import com.smartcommerce.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@Valid @RequestBody UserRequest request) {

        return userService.createUser(request);

    }
    @GetMapping("/test")
    public String test() {
        return "JWT Authentication Successful!";
    }

}