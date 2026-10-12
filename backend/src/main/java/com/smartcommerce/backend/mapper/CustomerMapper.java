package com.smartcommerce.backend.mapper;

import com.smartcommerce.backend.dto.request.CustomerRequest;
import com.smartcommerce.backend.dto.response.CustomerResponse;
import com.smartcommerce.backend.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public Customer toEntity(CustomerRequest request){

        return Customer.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .postalCode(request.getPostalCode())
                .build();

    }

    public CustomerResponse toResponse(Customer customer){

        return CustomerResponse.builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .city(customer.getCity())
                .state(customer.getState())
                .country(customer.getCountry())
                .postalCode(customer.getPostalCode())
                .active(customer.getActive())
                .createdAt(customer.getCreatedAt())
                .updatedAt(customer.getUpdatedAt())
                .build();

    }

}