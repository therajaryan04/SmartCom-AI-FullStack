package com.smartcommerce.backend.dto.response;

import com.smartcommerce.backend.enums.OrderStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Long id;

    private Long customerId;

    private String customerName;

    private BigDecimal totalAmount;

    private OrderStatus status;

    private LocalDateTime orderDate;

    private String orderNumber;

    private List<OrderItemResponse> items;

}