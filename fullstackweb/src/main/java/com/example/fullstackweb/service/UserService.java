package com.example.fullstackweb.service;

import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserService {
    public static final byte SUCCESS = 1;
    public static final byte FAIL = 0;
    public static final byte ERROR = -1;

    @Autowired
    UserRepository userRepository;

    // create user
    public byte createUser(@RequestBody User user) {
        if (user.getUserName().trim().isEmpty() || user.getPassword().trim().isEmpty()) {
            return ERROR;
        }

        Optional<User> existingUser = userRepository.findByUserName(user.getUserName());
        if (existingUser.isPresent()) {
            return FAIL;
        } else {
        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setFullName(user.getFullName());
        newUser.setNumberPhone(user.getNumberPhone());
        newUser.setStatus(1);
        userRepository.save(newUser);

        return SUCCESS;
        }
    }

    // login
    public byte loginUser(@RequestBody User user) {
        Optional<User> newUser = userRepository.findByUserName(user.getUserName());
        if (newUser.isPresent() && newUser.get().getPassword().equals(user.getPassword())) {
            return SUCCESS;
        }
        return FAIL;
    }
}
