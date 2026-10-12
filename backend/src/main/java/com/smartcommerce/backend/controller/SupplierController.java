package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.SupplierRequest;
import com.smartcommerce.backend.dto.response.SupplierResponse;
import com.smartcommerce.backend.service.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    // Create Supplier
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SupplierResponse createSupplier(
            @Valid @RequestBody SupplierRequest request) {

        return supplierService.createSupplier(request);
    }

    // Get All Suppliers
    @GetMapping
    public List<SupplierResponse> getAllSuppliers() {

        return supplierService.getAllSuppliers();
    }

    // Get Supplier By Id
    @GetMapping("/{id}")
    public SupplierResponse getSupplierById(
            @PathVariable Long id) {

        return supplierService.getSupplierById(id);
    }

    // Update Supplier
    @PutMapping("/{id}")
    public SupplierResponse updateSupplier(
            @PathVariable Long id,
            @Valid @RequestBody SupplierRequest request) {

        return supplierService.updateSupplier(id, request);
    }

    // Delete Supplier
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSupplier(
            @PathVariable Long id) {

        supplierService.deleteSupplier(id);
    }
}