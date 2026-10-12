package com.smartcommerce.backend.service;

import com.smartcommerce.backend.dto.request.SupplierRequest;
import com.smartcommerce.backend.dto.response.SupplierResponse;

import java.util.List;

public interface SupplierService {

    SupplierResponse createSupplier(SupplierRequest request);

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse getSupplierById(Long id);

    SupplierResponse updateSupplier(Long id, SupplierRequest request);

    void deleteSupplier(Long id);
}