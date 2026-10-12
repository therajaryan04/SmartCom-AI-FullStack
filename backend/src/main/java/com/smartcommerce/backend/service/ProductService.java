package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.ProductRequest;
import com.smartcommerce.backend.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);
}