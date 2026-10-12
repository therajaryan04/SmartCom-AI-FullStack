package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.response.SaleResponse;
import com.smartcommerce.backend.entity.Sale;
import org.springframework.stereotype.Component;

@Component
public class SaleMapper {

    public SaleResponse toResponse(Sale sale){

        return SaleResponse.builder()
                .id(sale.getId())
                .orderNumber(sale.getOrder().getOrderNumber())
                .customerName(
                        sale.getOrder()
                                .getCustomer()
                                .getFirstName()
                                +" "
                                +sale.getOrder()
                                .getCustomer()
                                .getLastName()
                )
                .totalAmount(sale.getTotalAmount())
                .saleDate(sale.getSaleDate())
                .build();

    }

}