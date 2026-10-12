package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.response.OrderItemResponse;
import com.smartcommerce.backend.dto.response.OrderResponse;
import com.smartcommerce.backend.entity.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {

    public OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems()
                .stream()
                .map(item -> OrderItemResponse.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .totalPrice(item.getTotalPrice())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .customerId(order.getCustomer().getId())
                .customerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .items(items)
                .build();

    }
}