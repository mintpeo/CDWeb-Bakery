package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingRepository extends JpaRepository<Shipping, Integer> {
}
