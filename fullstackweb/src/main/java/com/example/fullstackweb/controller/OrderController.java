package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Order;
import com.example.fullstackweb.request.CheckOutRequest;
import com.example.fullstackweb.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/user")
    public List<Order> getOrdersByUserId(@RequestParam Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping("/create")
    public Order createOrder(@RequestParam Long userId, @RequestBody CheckOutRequest request) {
        return orderService.createOrder(userId, request);
    }
}
