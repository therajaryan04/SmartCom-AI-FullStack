package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.CustomerRequest;
import com.smartcommerce.backend.dto.response.CustomerResponse;
import com.smartcommerce.backend.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Tag(name = "Customer Management")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create Customer")
    public CustomerResponse createCustomer(
            @Valid @RequestBody CustomerRequest request) {

        return customerService.createCustomer(request);
    }

    @GetMapping
    @Operation(summary = "Get All Customers")
    public List<CustomerResponse> getAllCustomers() {

        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Customer By ID")
    public CustomerResponse getCustomerById(
            @PathVariable Long id) {

        return customerService.getCustomerById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Customer")
    public CustomerResponse updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequest request) {

        return customerService.updateCustomer(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete Customer")
    public void deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);
    }
}