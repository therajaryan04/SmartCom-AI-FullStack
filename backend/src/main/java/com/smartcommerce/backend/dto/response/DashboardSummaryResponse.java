package com.smartcommerce.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {

    private Long totalProducts;

    private Long totalCustomers;

    private Long totalOrders;

    private Long totalSuppliers;

    private Long totalPayments;

    private BigDecimal totalRevenue;

    private Long lowStockProducts;

}