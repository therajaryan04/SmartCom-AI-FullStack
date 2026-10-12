package com.smartcommerce.backend.service.impl;

import com.smartcommerce.backend.dto.request.ProductRequest;
import com.smartcommerce.backend.dto.response.ProductResponse;
import com.smartcommerce.backend.entity.Product;
import com.smartcommerce.backend.mapper.ProductMapper;
import com.smartcommerce.backend.repository.ProductRepository;
import com.smartcommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.smartcommerce.backend.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        Product product = productMapper.toEntity(request);

        Product savedProduct = productRepository.save(product);

        return productMapper.toResponse(savedProduct);
    }

    @Override
    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setBrand(request.getBrand());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCostPrice(request.getCostPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setReorderLevel(request.getReorderLevel());
        product.setSupplier(request.getSupplier());
        product.setStatus(request.getStatus());

        Product updatedProduct = productRepository.save(product);

        return productMapper.toResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }
}