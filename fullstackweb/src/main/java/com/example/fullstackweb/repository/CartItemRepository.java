package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
