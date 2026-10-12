package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.InventoryRequest;
import com.smartcommerce.backend.dto.response.InventoryResponse;
import com.smartcommerce.backend.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // Create Inventory
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryResponse createInventory(
            @Valid @RequestBody InventoryRequest request) {

        System.out.println("Inventory Controller Called");

        return inventoryService.createInventory(request);
    }

    // Get All Inventory
    @GetMapping
    public List<InventoryResponse> getAllInventory() {

        return inventoryService.getAllInventory();
    }

    // Get Inventory By ID
    @GetMapping("/{id}")
    public InventoryResponse getInventoryById(
            @PathVariable Long id) {

        return inventoryService.getInventoryById(id);
    }

    // Update Inventory
    @PutMapping("/{id}")
    public InventoryResponse updateInventory(
            @PathVariable Long id,
            @Valid @RequestBody InventoryRequest request) {

        return inventoryService.updateInventory(id, request);
    }

    // Delete Inventory
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInventory(
            @PathVariable Long id) {

        inventoryService.deleteInventory(id);
    }
}