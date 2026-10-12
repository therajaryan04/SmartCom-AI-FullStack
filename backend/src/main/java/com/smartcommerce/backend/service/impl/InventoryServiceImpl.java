package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.request.InventoryRequest;
import com.smartcommerce.backend.dto.response.InventoryResponse;
import com.smartcommerce.backend.entity.Inventory;
import com.smartcommerce.backend.entity.Product;
import com.smartcommerce.backend.exception.ResourceNotFoundException;
import com.smartcommerce.backend.mapper.InventoryMapper;
import com.smartcommerce.backend.repository.InventoryRepository;
import com.smartcommerce.backend.repository.ProductRepository;
import com.smartcommerce.backend.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final InventoryMapper inventoryMapper;

    @Override
    public InventoryResponse createInventory(InventoryRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Inventory inventory = Inventory.builder()
                .product(product)
                .quantityAvailable(request.getQuantityAvailable())
                .reservedQuantity(request.getReservedQuantity())
                .reorderLevel(request.getReorderLevel())
                .warehouseLocation(request.getWarehouseLocation())
                .build();

        Inventory savedInventory = inventoryRepository.save(inventory);

        return inventoryMapper.toResponse(savedInventory);
    }

    @Override
    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository.findAll()
                .stream()
                .map(inventoryMapper::toResponse)
                .toList();
    }

    @Override
    public InventoryResponse getInventoryById(Long id) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        return inventoryMapper.toResponse(inventory);
    }

    @Override
    public InventoryResponse updateInventory(Long id,
                                             InventoryRequest request) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        inventory.setProduct(product);
        inventory.setQuantityAvailable(request.getQuantityAvailable());
        inventory.setReservedQuantity(request.getReservedQuantity());
        inventory.setReorderLevel(request.getReorderLevel());
        inventory.setWarehouseLocation(request.getWarehouseLocation());

        Inventory updatedInventory = inventoryRepository.save(inventory);

        return inventoryMapper.toResponse(updatedInventory);
    }

    @Override
    public void deleteInventory(Long id) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        inventoryRepository.delete(inventory);
    }
}