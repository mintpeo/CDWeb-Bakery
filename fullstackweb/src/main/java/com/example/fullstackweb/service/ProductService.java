package com.example.fullstackweb.service;

import com.example.fullstackweb.models.Product;
import com.example.fullstackweb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // id
    public Optional<Product> getIdProduct(Long id) {
        return productRepository.findById(id);
    }

    // search
    public List<Product> getSearchProducts(String name) {
        if (name != null && !name.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(name);
        }
        return getAllProducts();
    }

    // cate
    public List<Product> getCategoryIdProducts(int categoryId) {
        if (categoryId != 0) {
            return productRepository.findByCategoryId(categoryId);
        }
        return getAllProducts();
    }

    // price
    public List<Product> getPriceProducts(int maxPrice) {
        if (maxPrice == 0) {
            return getAllProducts();
        }
        return productRepository.findByPriceLessThan(maxPrice);
    }
}
