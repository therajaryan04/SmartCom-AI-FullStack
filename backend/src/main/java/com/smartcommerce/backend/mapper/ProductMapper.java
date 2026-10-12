package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.request.ProductRequest;
import com.smartcommerce.backend.dto.response.ProductResponse;
import com.smartcommerce.backend.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    // Convert Request DTO -> Entity
    public Product toEntity(ProductRequest request) {

        return Product.builder()
                .name(request.getName())
                .category(request.getCategory())
                .brand(request.getBrand())
                .description(request.getDescription())
                .price(request.getPrice())
                .costPrice(request.getCostPrice())
                .stockQuantity(request.getStockQuantity())
                .reorderLevel(request.getReorderLevel())
                .supplier(request.getSupplier())
                .status(request.getStatus())
                .build();
    }

    // Convert Entity -> Response DTO
    public ProductResponse toResponse(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory())
                .brand(product.getBrand())
                .description(product.getDescription())
                .price(product.getPrice())
                .costPrice(product.getCostPrice())
                .stockQuantity(product.getStockQuantity())
                .reorderLevel(product.getReorderLevel())
                .supplier(product.getSupplier())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}