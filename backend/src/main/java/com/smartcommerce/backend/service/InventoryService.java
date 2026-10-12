package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.InventoryRequest;
import com.smartcommerce.backend.dto.response.InventoryResponse;

import java.util.List;

public interface InventoryService {

    InventoryResponse createInventory(InventoryRequest request);

    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventoryById(Long id);

    InventoryResponse updateInventory(Long id, InventoryRequest request);

    void deleteInventory(Long id);
}