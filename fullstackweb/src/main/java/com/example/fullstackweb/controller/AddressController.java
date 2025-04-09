package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Address;
import com.example.fullstackweb.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/get")
    public ResponseEntity<List<Address>> getAddress(@RequestParam Long userId) {
        List<Address> addresses = addressService.getAddresses(userId);
        return ResponseEntity.ok(addresses);
    }

    @PostMapping("/add")
    public Address addAddress(@RequestParam Long userId, @RequestBody Address address) {
        return addressService.addAddress(userId, address);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeAddress(@RequestParam Long userId, @RequestParam Long addressId) {
        addressService.deleteUserAddress(userId, addressId);
        return ResponseEntity.ok("Address deleted successfully.");
    }

}
