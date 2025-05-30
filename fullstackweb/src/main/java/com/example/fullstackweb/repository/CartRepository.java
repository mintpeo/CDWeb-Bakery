package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Cart;
import com.example.fullstackweb.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
