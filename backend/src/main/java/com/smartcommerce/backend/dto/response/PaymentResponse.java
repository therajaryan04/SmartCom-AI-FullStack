package com.smartcommerce.backend.dto.response;

import com.smartcommerce.backend.enums.PaymentMethod;
import com.smartcommerce.backend.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private Long id;

    private Long orderId;

    private String orderNumber;

    private BigDecimal amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private LocalDateTime paymentDate;
}