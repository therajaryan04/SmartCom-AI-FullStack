package com.smartcommerce.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryRequest {

    private Long productId;

    private Integer quantityAvailable;

    private Integer reservedQuantity;

    private Integer reorderLevel;

    private String warehouseLocation;
}