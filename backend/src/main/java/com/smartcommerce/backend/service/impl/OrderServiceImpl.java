package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.request.OrderRequest;
import com.smartcommerce.backend.dto.response.OrderResponse;
import com.smartcommerce.backend.entity.*;
import com.smartcommerce.backend.exception.BadRequestException;
import com.smartcommerce.backend.exception.ResourceNotFoundException;
import com.smartcommerce.backend.mapper.OrderMapper;
import com.smartcommerce.backend.repository.*;
import com.smartcommerce.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartcommerce.backend.dto.request.OrderItemRequest;
import com.smartcommerce.backend.enums.OrderStatus;

import java.math.BigDecimal;
import java.util.ArrayList;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final CustomerRepository customerRepository;
    private final OrderMapper orderMapper;

    @Override
    public OrderResponse placeOrder(OrderRequest request) {

        // Find Customer
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        // Create Order
        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderNumber("ORD-" + System.currentTimeMillis());
        order.setStatus(OrderStatus.PENDING);

        BigDecimal grandTotal = BigDecimal.ZERO;

        List<OrderItem> orderItems = new ArrayList<>();

        // Process each item
        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Product not found"));

            Inventory inventory = inventoryRepository.findByProduct(product)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Inventory not found"));

            if (inventory.getQuantityAvailable() < itemRequest.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient stock for product: " + product.getName());
            }

            BigDecimal itemTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            grandTotal = grandTotal.add(itemTotal);

            inventory.setQuantityAvailable(
                    inventory.getQuantityAvailable() - itemRequest.getQuantity());

            inventoryRepository.save(inventory);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(product.getPrice())
                    .totalPrice(itemTotal)
                    .build();

            orderItems.add(orderItem);
        }

        order.setTotalAmount(grandTotal);
        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        return orderMapper.toResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        return orderMapper.toResponse(order);
    }

    @Override
    public void cancelOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        order.setStatus(com.smartcommerce.backend.enums.OrderStatus.CANCELLED);

        orderRepository.save(order);
    }
}