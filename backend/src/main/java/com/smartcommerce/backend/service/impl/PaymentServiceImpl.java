package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.request.PaymentRequest;
import com.smartcommerce.backend.dto.response.PaymentResponse;
import com.smartcommerce.backend.entity.Order;
import com.smartcommerce.backend.entity.Payment;
import com.smartcommerce.backend.entity.Sale;
import com.smartcommerce.backend.enums.OrderStatus;
import com.smartcommerce.backend.enums.PaymentStatus;
import com.smartcommerce.backend.exception.ResourceNotFoundException;
import com.smartcommerce.backend.mapper.PaymentMapper;
import com.smartcommerce.backend.repository.OrderRepository;
import com.smartcommerce.backend.repository.PaymentRepository;
import com.smartcommerce.backend.repository.SaleRepository;
import com.smartcommerce.backend.service.PaymentService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PaymentMapper paymentMapper;
    private final SaleRepository saleRepository;

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        Payment payment = Payment.builder()
                .order(order)
                .amount(order.getTotalAmount())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(PaymentStatus.SUCCESS)
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        Sale sale = Sale.builder()
                .order(order)
                .totalAmount(order.getTotalAmount())
                .build();

        saleRepository.save(sale);

        order.setStatus(OrderStatus.CONFIRMED);

        orderRepository.save(order);

        return paymentMapper.toResponse(savedPayment);
    }

    @Override
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(paymentMapper::toResponse)
                .toList();
    }

    @Override
    public PaymentResponse getPayment(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        return paymentMapper.toResponse(payment);
    }
}