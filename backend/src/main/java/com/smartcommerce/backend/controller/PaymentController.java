package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.request.PaymentRequest;
import com.smartcommerce.backend.dto.response.PaymentResponse;
import com.smartcommerce.backend.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payment Management")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentResponse processPayment(
            @Valid @RequestBody PaymentRequest request) {

        return paymentService.processPayment(request);
    }

    @GetMapping
    public List<PaymentResponse> getAllPayments() {

        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public PaymentResponse getPayment(@PathVariable Long id) {

        return paymentService.getPayment(id);
    }
}