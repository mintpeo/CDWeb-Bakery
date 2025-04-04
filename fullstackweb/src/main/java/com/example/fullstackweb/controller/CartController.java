package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Cart;
import com.example.fullstackweb.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/userGet")
    public ResponseEntity<Cart> getCart(@RequestParam int userId) {
        return ResponseEntity.ok(cartService.getCartById(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam int userId,
                                          @RequestParam int productId,
                                          @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }
}

