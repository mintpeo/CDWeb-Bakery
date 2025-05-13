package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.BankCardType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankCardTypeRepository extends JpaRepository<BankCardType, Integer> {
}
