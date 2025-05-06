package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Discount;
import com.example.fullstackweb.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.fullstackweb.models.Status.API;

@RestController
@RequestMapping("/discount")
@CrossOrigin(origins = API)
public class DiscountController {
    @Autowired
    private DiscountService discountService;

    @GetMapping("/all")
    public List<Discount> getAllDiscount() {
        return discountService.getALLDiscount();
    }
}
