package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.request.SupplierRequest;
import com.smartcommerce.backend.dto.response.SupplierResponse;
import com.smartcommerce.backend.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {

    public Supplier toEntity(SupplierRequest request) {

        return Supplier.builder()
                .companyName(request.getCompanyName())
                .contactPerson(request.getContactPerson())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .postalCode(request.getPostalCode())
                .gstNumber(request.getGstNumber())
                .build();
    }

    public SupplierResponse toResponse(Supplier supplier) {

        return SupplierResponse.builder()
                .id(supplier.getId())
                .companyName(supplier.getCompanyName())
                .contactPerson(supplier.getContactPerson())
                .email(supplier.getEmail())
                .phone(supplier.getPhone())
                .address(supplier.getAddress())
                .city(supplier.getCity())
                .state(supplier.getState())
                .country(supplier.getCountry())
                .postalCode(supplier.getPostalCode())
                .gstNumber(supplier.getGstNumber())
                .active(supplier.getActive())
                .createdAt(supplier.getCreatedAt())
                .updatedAt(supplier.getUpdatedAt())
                .build();
    }
}