package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Product;
import com.example.fullstackweb.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping(path = "/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping(path = "/search")
    public List<Product> getSearchProducts(@RequestParam(required = false) String name) {
        return productService.getSearchProducts(name);
    }
}
