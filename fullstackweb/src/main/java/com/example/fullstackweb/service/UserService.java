package com.example.fullstackweb.service;

import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.example.fullstackweb.models.Status.FAIL;
import static com.example.fullstackweb.models.Status.SUCCESS;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Optional<User> getInfoUser(Long id) {
        return userRepository.findById(id);
    }

    // create user
    public Boolean createUser(@RequestBody User user) {
        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setFullName(user.getFullName());
        newUser.setNumberPhone(user.getNumberPhone());
        newUser.setStatus(1);
        userRepository.save(newUser);

        return true;
    }

    // exist user name
    public Boolean checkUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }


    // login
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Optional<User> newUser = userRepository.findByUserName(user.getUserName());

        Map<String, Object> response = new HashMap<>();
        if (newUser.isPresent() && newUser.get().getPassword().equals(user.getPassword())) {
            int status = newUser.get().getStatus();
            Long id = newUser.get().getId();

            response.put("Status", SUCCESS);
            response.put("Id", id);
            response.put("UStatus", status);

            return ResponseEntity.ok(response);
        }
        response.put("Status", FAIL);
        return ResponseEntity.ok(response);
    }

    public User updateUser(Long userId, User user) throws Exception {
        Optional<User> userById = userRepository.findById(userId);
        if (userById.isEmpty()) throw new Exception("User not found: " + userId);

        User oldUser = userById.get();

        oldUser.setEmail(user.getEmail());
        oldUser.setFullName(user.getFullName());
        oldUser.setNumberPhone(user.getNumberPhone());
        oldUser.setGender(user.getGender());
        oldUser.setDate(user.getDate());

        return userRepository.save(oldUser);
    }
}
