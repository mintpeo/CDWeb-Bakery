package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
