package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.ProductRequest;
import com.smartcommerce.backend.dto.response.ProductResponse;
import com.smartcommerce.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // Create Product
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(
            @Valid @RequestBody ProductRequest request) {

        return productService.createProduct(request);
    }

    // Get All Products
    @GetMapping
    public List<ProductResponse> getAllProducts() {

        return productService.getAllProducts();
    }

    // Get Product By ID
    @GetMapping("/{id}")
    public ProductResponse getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    // Update Product
    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return productService.updateProduct(id, request);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);
    }
}