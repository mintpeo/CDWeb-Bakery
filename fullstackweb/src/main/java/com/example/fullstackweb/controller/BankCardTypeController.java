package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.BankCardType;
import com.example.fullstackweb.service.BankCardTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.fullstackweb.models.Status.API;

@RestController
@RequestMapping(path = "/bankTypes")
@CrossOrigin(origins = API)
public class BankCardTypeController {
    @Autowired
    private BankCardTypeService bankCardTypeService;

    @GetMapping(path = "/all")
    public List<BankCardType> getAllBankCardType() {
        return bankCardTypeService.getAllBankCardType();
    }
}
