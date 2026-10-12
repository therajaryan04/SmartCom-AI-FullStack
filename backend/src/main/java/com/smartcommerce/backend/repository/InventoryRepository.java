package com.smartcommerce.backend.repository;

import com.smartcommerce.backend.entity.Inventory;
import com.smartcommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByProduct(Product product);

}