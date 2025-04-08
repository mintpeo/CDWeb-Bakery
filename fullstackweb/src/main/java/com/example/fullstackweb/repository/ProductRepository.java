package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryId(Integer categoryId);
    List<Product> findByPriceLessThan(Integer price);
    List<Product> findByNameContainingIgnoreCaseAndCategoryIdAndPriceLessThan(
            String name, Integer categoryId, Integer price);
}
