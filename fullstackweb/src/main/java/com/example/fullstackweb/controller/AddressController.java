package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Address;
import com.example.fullstackweb.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.example.fullstackweb.models.Status.API;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = API)
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/get")
    public List<Address> getUserAddress(@RequestParam Long userId) {
        return addressService.getUserAddresses(userId);
    }

    @GetMapping("/id")
    public Optional<Address> getAddress(@RequestParam Long addressId, @RequestParam Long userId) {
        return addressService.getAddress(addressId, userId);
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

    @PutMapping("/update")
    public Address updateAddress(@RequestParam Long userId, @RequestParam Long addressId, @RequestBody Address address) {
        return addressService.updateAddress(userId, addressId, address);
    }

}
