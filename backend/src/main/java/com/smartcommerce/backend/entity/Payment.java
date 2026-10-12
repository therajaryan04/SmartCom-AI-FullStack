package com.smartcommerce.backend.entity;

import com.smartcommerce.backend.enums.PaymentMethod;
import com.smartcommerce.backend.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="order_id")
    private Order order;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private LocalDateTime paymentDate;

    @PrePersist
    public void onCreate(){

        paymentDate = LocalDateTime.now();

        if(paymentStatus==null){
            paymentStatus=PaymentStatus.PENDING;
        }

    }

}