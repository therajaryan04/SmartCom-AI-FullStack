package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.CustomerRequest;
import com.smartcommerce.backend.dto.response.CustomerResponse;

import java.util.List;

public interface CustomerService {

    CustomerResponse createCustomer(CustomerRequest request);

    List<CustomerResponse> getAllCustomers();

    CustomerResponse getCustomerById(Long id);

    CustomerResponse updateCustomer(Long id, CustomerRequest request);

    void deleteCustomer(Long id);

}