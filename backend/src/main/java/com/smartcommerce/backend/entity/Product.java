package com.smartcommerce.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.smartcommerce.backend.enums.ProductStatus;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;

    private String brand;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal costPrice;

    private Integer stockQuantity;



    private Integer reorderLevel;

    private String supplier;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}