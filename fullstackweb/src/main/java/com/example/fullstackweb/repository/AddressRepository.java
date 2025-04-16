package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Address;
import com.example.fullstackweb.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUser(User user);
    Optional<Address> findByIdAndUser_Id(Long id, Long userId);
}
