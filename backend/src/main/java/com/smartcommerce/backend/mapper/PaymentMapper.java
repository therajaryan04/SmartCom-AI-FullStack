package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.response.PaymentResponse;
import com.smartcommerce.backend.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentResponse toResponse(Payment payment) {

        return PaymentResponse.builder()
                .id(payment.getId())
                .orderId(payment.getOrder().getId())
                .orderNumber(payment.getOrder().getOrderNumber())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .paymentDate(payment.getPaymentDate())
                .build();
    }
}