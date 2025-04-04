package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Category;
import com.example.fullstackweb.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.fullstackweb.models.Status.*;

@RestController
@RequestMapping(path = "/cate")
@CrossOrigin(origins = API)
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping(path = "/all")
    public List<Category> getAllCate() {
        return categoryService.getAllCategory();
    }
}
