package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
