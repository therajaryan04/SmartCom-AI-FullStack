package com.smartcommerce.backend.dto.request;

import com.smartcommerce.backend.enums.ProductStatus;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    private String name;

    private String category;

    private String brand;

    private String description;

    private BigDecimal price;

    private BigDecimal costPrice;

    private Integer stockQuantity;

    private Integer reorderLevel;

    private String supplier;

    private ProductStatus status;
}