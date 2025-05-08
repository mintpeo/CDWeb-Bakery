package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.BankCard;
import com.example.fullstackweb.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankCardRepository extends JpaRepository<BankCard, Long> {
    List<BankCard> findByUserId(Long userId);
}
