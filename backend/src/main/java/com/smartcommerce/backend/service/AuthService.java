package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.LoginRequest;
import com.smartcommerce.backend.dto.request.RegisterRequest;
import com.smartcommerce.backend.dto.response.LoginResponse;
import com.smartcommerce.backend.dto.response.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}