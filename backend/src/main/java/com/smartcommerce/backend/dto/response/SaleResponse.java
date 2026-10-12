package com.smartcommerce.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleResponse {

    private Long id;

    private String orderNumber;

    private String customerName;

    private BigDecimal totalAmount;

    private LocalDateTime saleDate;

}