package com.example.fullstackweb.service;

import com.example.fullstackweb.models.BankCard;
import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.BankCardRepository;
import com.example.fullstackweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankCardService {
    @Autowired
    private BankCardRepository bankCardRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BankCard> getBankUserId(Long userId) {
        return bankCardRepository.findByUserId(userId);
    }

    public BankCard addBankCard(Long userId, BankCard bankCard) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        bankCard.setUser(user);
        return bankCardRepository.save(bankCard);
    }
}
