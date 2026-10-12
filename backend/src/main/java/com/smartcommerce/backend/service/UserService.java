package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.UserRequest;
import com.smartcommerce.backend.dto.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    void deleteUser(Long id);

}