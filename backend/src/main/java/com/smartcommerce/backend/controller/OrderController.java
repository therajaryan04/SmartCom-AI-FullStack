package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.OrderRequest;
import com.smartcommerce.backend.dto.response.OrderResponse;
import com.smartcommerce.backend.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Order Management")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse placeOrder(
            @Valid @RequestBody OrderRequest request) {

        return orderService.placeOrder(request);
    }

    @GetMapping
    public List<OrderResponse> getAllOrders() {

        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderResponse getOrder(@PathVariable Long id) {

        return orderService.getOrder(id);
    }

    @PutMapping("/{id}/cancel")
    public void cancelOrder(@PathVariable Long id) {

        orderService.cancelOrder(id);
    }
}