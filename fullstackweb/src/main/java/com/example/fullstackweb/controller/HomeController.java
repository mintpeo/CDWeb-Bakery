package com.example.fullstackweb.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.fullstackweb.models.Status.API;

@RestController
@CrossOrigin(origins = API)
public class HomeController {
    @GetMapping
    public String homeController() {
        return "this is home";
    }
}
