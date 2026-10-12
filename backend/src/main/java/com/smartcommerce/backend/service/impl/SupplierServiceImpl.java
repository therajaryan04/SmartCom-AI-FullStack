package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.request.SupplierRequest;
import com.smartcommerce.backend.dto.response.SupplierResponse;
import com.smartcommerce.backend.entity.Supplier;
import com.smartcommerce.backend.exception.BadRequestException;
import com.smartcommerce.backend.exception.ResourceNotFoundException;
import com.smartcommerce.backend.mapper.SupplierMapper;
import com.smartcommerce.backend.repository.SupplierRepository;
import com.smartcommerce.backend.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    @Override
    public SupplierResponse createSupplier(SupplierRequest request) {

        if (supplierRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Supplier with this email already exists");
        }

        Supplier supplier = supplierMapper.toEntity(request);

        Supplier savedSupplier = supplierRepository.save(supplier);

        return supplierMapper.toResponse(savedSupplier);
    }

    @Override
    public List<SupplierResponse> getAllSuppliers() {

        return supplierRepository.findAll()
                .stream()
                .map(supplierMapper::toResponse)
                .toList();
    }

    @Override
    public SupplierResponse getSupplierById(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

        return supplierMapper.toResponse(supplier);
    }

    @Override
    public SupplierResponse updateSupplier(Long id,
                                           SupplierRequest request) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

        if (!supplier.getEmail().equals(request.getEmail())
                && supplierRepository.existsByEmail(request.getEmail())) {

            throw new BadRequestException("Supplier with this email already exists");
        }

        supplier.setCompanyName(request.getCompanyName());
        supplier.setContactPerson(request.getContactPerson());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
        supplier.setCity(request.getCity());
        supplier.setState(request.getState());
        supplier.setCountry(request.getCountry());
        supplier.setPostalCode(request.getPostalCode());
        supplier.setGstNumber(request.getGstNumber());

        Supplier updatedSupplier = supplierRepository.save(supplier);

        return supplierMapper.toResponse(updatedSupplier);
    }

    @Override
    public void deleteSupplier(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

        supplierRepository.delete(supplier);
    }
}