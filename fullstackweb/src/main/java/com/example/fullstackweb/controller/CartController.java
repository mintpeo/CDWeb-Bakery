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
    public ResponseEntity<Cart> getCart(@RequestParam Long userId) {
        return ResponseEntity.ok(cartService.getCartById(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam Long userId,
                                          @RequestParam Long productId,
                                          @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateQuantity(@RequestParam Long userId,
                                               @RequestParam Long productId,
                                               @RequestParam int quantity) {
        Cart cart = cartService.updateQuantity(userId, productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        Cart cart = cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok(cart);
    }
}

