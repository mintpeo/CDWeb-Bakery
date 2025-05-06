package com.example.fullstackweb.service;

import com.example.fullstackweb.models.Discount;
import com.example.fullstackweb.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscountService {
    @Autowired
    private DiscountRepository discountRepository;

    public List<Discount> getALLDiscount() {
        return discountRepository.findAll();
    }
}
