package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.PaymentRequest;
import com.smartcommerce.backend.dto.response.PaymentResponse;

import java.util.List;

public interface PaymentService {

    PaymentResponse processPayment(PaymentRequest request);

    List<PaymentResponse> getAllPayments();

    PaymentResponse getPayment(Long id);

}