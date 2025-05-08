package com.example.fullstackweb.service;

import com.example.fullstackweb.models.Address;
import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.AddressRepository;
import com.example.fullstackweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<Address> getAddress(Long addressId, Long userId) {
        return addressRepository.findByIdAndUser_Id(addressId, userId);
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return user.getAddresses().stream().filter(
//                address -> address.getId().equals(addressId)).findFirst();
    }

    public List<Address> getUserAddresses(Long userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        return addressRepository.findAllByUser(user);
        return addressRepository.findByUserId(userId);
    }

    public Address addAddress(Long userId, Address address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        address.setUser(user);
        return addressRepository.save(address);
    }

    public void deleteUserAddress(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Address does not belong to this user");
        }

        addressRepository.delete(address);
    }

    public Address updateAddress(Long userId, Long addressId, Address newAddress) {
        Address oldAddress = addressRepository.findByIdAndUser_Id(addressId, userId)
                .orElseThrow(() -> new RuntimeException("Address not found for this user"));

        oldAddress.setName(newAddress.getName());
        oldAddress.setPhone(newAddress.getPhone());
        oldAddress.setText(newAddress.getText());
        oldAddress.setProvince(newAddress.getProvince());
        oldAddress.setDistrict(newAddress.getDistrict());
        oldAddress.setWard(newAddress.getWard());

        return addressRepository.save(oldAddress);
    }
}
