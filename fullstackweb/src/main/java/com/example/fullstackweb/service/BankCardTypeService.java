package com.example.fullstackweb.service;

import com.example.fullstackweb.models.BankCardType;
import com.example.fullstackweb.repository.BankCardRepository;
import com.example.fullstackweb.repository.BankCardTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankCardTypeService {
    @Autowired
    private BankCardTypeRepository bankCardTypeRepository;

    public List<BankCardType> getAllBankCardType() {
        return bankCardTypeRepository.findAll();
    }

}
