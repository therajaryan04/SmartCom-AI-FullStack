package com.smartcommerce.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryResponse {

    private Long id;

    private Long productId;

    private String productName;

    private Integer quantityAvailable;

    private Integer reservedQuantity;

    private Integer reorderLevel;

    private String warehouseLocation;

    private LocalDateTime lastUpdated;
}