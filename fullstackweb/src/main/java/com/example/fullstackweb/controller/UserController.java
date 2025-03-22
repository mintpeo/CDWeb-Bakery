package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.UserRepository;
import com.example.fullstackweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public byte createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public byte loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @GetMapping("/all")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable("userId") int id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        throw new Exception("User not found: " + id);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable("userId") int id  ,@RequestBody User user) throws Exception {
        Optional<User> userById = userRepository.findById(id);
        if (userById.isEmpty()) {
            throw new Exception("User not exit: " + id);
        }

        User oldUser = userById.get();
        if (user.getUserName() != null) {
            oldUser.setUserName(user.getUserName());
        }
        if (user.getPassword() != null) {
            oldUser.setPassword(user.getPassword());
        }
        if (user.getEmail() != null) {
            oldUser.setEmail(user.getEmail());
        }
        if (user.getFullName() != null) {
            oldUser.setFullName(user.getFullName());
        }
        if (user.getNumberPhone() != null) {
            oldUser.setNumberPhone(user.getNumberPhone());
        }
        return userRepository.save(oldUser);
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable("userId") int id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new Exception("Not found user with id: " + id + " can't delete");
        }

        userRepository.delete(user.get());
        return "User deleted successfully with id: " + id;
    }
}
