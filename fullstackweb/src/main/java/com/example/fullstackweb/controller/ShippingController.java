package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Shipping;
import com.example.fullstackweb.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.fullstackweb.models.Status.API;

@RestController
@RequestMapping("/shipping")
@CrossOrigin(origins = API)
public class ShippingController {
    @Autowired
    private ShippingService shippingService;

    @GetMapping("/all")
    public List<Shipping> getAllShipping() {
        return shippingService.getAllShipping();
    }
}
