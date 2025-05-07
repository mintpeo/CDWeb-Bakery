package com.example.fullstackweb.service;

import com.example.fullstackweb.models.Shipping;
import com.example.fullstackweb.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingService {
    @Autowired
    private ShippingRepository shippingRepository;

    public List<Shipping> getAllShipping() {
        return shippingRepository.findAll();
    }
}
