package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.response.DashboardSummaryResponse;
import com.smartcommerce.backend.repository.CustomerRepository;
import com.smartcommerce.backend.repository.InventoryRepository;
import com.smartcommerce.backend.repository.OrderRepository;
import com.smartcommerce.backend.repository.PaymentRepository;
import com.smartcommerce.backend.repository.ProductRepository;
import com.smartcommerce.backend.repository.SaleRepository;
import com.smartcommerce.backend.repository.SupplierRepository;
import com.smartcommerce.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final InventoryRepository inventoryRepository;
    private final SaleRepository saleRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        BigDecimal revenue = saleRepository.findAll()
                .stream()
                .map(sale -> sale.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long lowStock = inventoryRepository.findAll()
                .stream()
                .filter(i -> i.getQuantityAvailable() <= 10)
                .count();

        return DashboardSummaryResponse.builder()
                .totalProducts(productRepository.count())
                .totalCustomers(customerRepository.count())
                .totalSuppliers(supplierRepository.count())
                .totalOrders(orderRepository.count())
                .totalPayments(paymentRepository.count())
                .totalRevenue(revenue)
                .lowStockProducts(lowStock)
                .build();
    }
}