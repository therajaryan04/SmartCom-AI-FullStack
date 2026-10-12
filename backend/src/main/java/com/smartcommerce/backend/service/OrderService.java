package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.OrderRequest;
import com.smartcommerce.backend.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(OrderRequest request);

    List<OrderResponse> getAllOrders();

    OrderResponse getOrder(Long id);

    void cancelOrder(Long id);

}