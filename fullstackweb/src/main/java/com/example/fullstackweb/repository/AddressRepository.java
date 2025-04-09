package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Address;
import com.example.fullstackweb.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUser(User user);
}
