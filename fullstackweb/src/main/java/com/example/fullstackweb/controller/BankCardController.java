package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.BankCard;
import com.example.fullstackweb.service.BankCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.fullstackweb.models.Status.API;

@RestController
@RequestMapping(path = "/banks")
@CrossOrigin(origins = API)
public class BankCardController {
    @Autowired
    private BankCardService bankCardService;

    @GetMapping("/user")
    public List<BankCard> getBankUserId(Long userId) {
        return bankCardService.getBankUserId(userId);
    }

    @PostMapping("/add")
    public BankCard addBankCard(@RequestParam Long userId, @RequestBody BankCard bankCard) {
        return bankCardService.addBankCard(userId, bankCard);
    }

    @DeleteMapping("/remove")
    public Boolean deleteBankCard(@RequestParam Long userId, @RequestParam Long bankCardId) {
        return bankCardService.deleteBankCard(userId, bankCardId);
    }
}
