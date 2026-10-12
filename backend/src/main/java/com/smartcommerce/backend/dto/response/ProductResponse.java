package com.smartcommerce.backend.dto.response;

import com.smartcommerce.backend.enums.ProductStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

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

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}