package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.request.CustomerRequest;
import com.smartcommerce.backend.dto.response.CustomerResponse;
import com.smartcommerce.backend.entity.Customer;
import com.smartcommerce.backend.exception.BadRequestException;
import com.smartcommerce.backend.exception.ResourceNotFoundException;
import com.smartcommerce.backend.mapper.CustomerMapper;
import com.smartcommerce.backend.repository.CustomerRepository;
import com.smartcommerce.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerResponse createCustomer(CustomerRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Customer with this email already exists");
        }

        Customer customer = customerMapper.toEntity(request);

        Customer savedCustomer = customerRepository.save(customer);

        return customerMapper.toResponse(savedCustomer);
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toResponse)
                .toList();
    }

    @Override
    public CustomerResponse getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        return customerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse updateCustomer(Long id,
                                           CustomerRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        if (!customer.getEmail().equals(request.getEmail())
                && customerRepository.existsByEmail(request.getEmail())) {

            throw new BadRequestException("Customer with this email already exists");
        }

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setCountry(request.getCountry());
        customer.setPostalCode(request.getPostalCode());

        Customer updatedCustomer = customerRepository.save(customer);

        return customerMapper.toResponse(updatedCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customerRepository.delete(customer);
    }
}