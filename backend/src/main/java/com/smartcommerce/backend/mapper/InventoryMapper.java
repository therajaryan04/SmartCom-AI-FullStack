package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.response.InventoryResponse;
import com.smartcommerce.backend.entity.Inventory;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public InventoryResponse toResponse(Inventory inventory) {

        return InventoryResponse.builder()
                .id(inventory.getId())
                .productId(inventory.getProduct().getId())
                .productName(inventory.getProduct().getName())
                .quantityAvailable(inventory.getQuantityAvailable())
                .reservedQuantity(inventory.getReservedQuantity())
                .reorderLevel(inventory.getReorderLevel())
                .warehouseLocation(inventory.getWarehouseLocation())
                .lastUpdated(inventory.getLastUpdated())
                .build();
    }
}