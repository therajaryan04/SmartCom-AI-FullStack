package com.smartcommerce.backend.entity;

import com.smartcommerce.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(nullable = false, unique = true)
    private String orderNumber;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItems;



    private LocalDateTime orderDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        orderDate = LocalDateTime.now();

        if(status == null){
            status = OrderStatus.PENDING;
        }

    }

    @PreUpdate
    public void onUpdate(){

        updatedAt = LocalDateTime.now();

    }

}