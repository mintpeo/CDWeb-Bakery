package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Product;
import com.example.fullstackweb.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.example.fullstackweb.models.Status.*;

@RestController
@RequestMapping(path = "/products")
@CrossOrigin(origins = API)
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping(path = "/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping(path = "/{id}")
    public Optional<Product> getIdProduct(@PathVariable("id") Long id) {
        return productService.getIdProduct(id);
    }

    @GetMapping(path = "/search")
    public List<Product> getSearchProducts(@RequestParam(required = false) String name) {
        return productService.getSearchProducts(name);
    }

    @GetMapping(path = "/id")
    public List<Product> getCategoryIdProducts(@RequestParam int categoryId) {
        return productService.getCategoryIdProducts(categoryId);
    }

    @GetMapping(path = "/price")
    public List<Product> getPriceProducts(@RequestParam int maxPrice) {
        return productService.getPriceProducts(maxPrice);
    }
}
