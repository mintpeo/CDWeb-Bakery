package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.UserRepository;
import com.example.fullstackweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.example.fullstackweb.models.Status.*;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = API)
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/info")
    public Optional<User> getInfoUser(@RequestParam Long id) {
        return userService.getInfoUser(id);
    }

    @PostMapping("/create")
    public Boolean createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/check")
    public Boolean checkUserName(@RequestParam String userName) {
        return userService.checkUserName(userName);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestParam Long userId, @RequestBody User user) throws Exception {
        return userService.updateUser(userId, user);
    }

    @PutMapping("/updatePass")
    public User updatePass(@RequestParam Long userId, @RequestBody User user) throws Exception {
        return userService.updatePass(userId, user);
    }

    @PutMapping("/updateAvatar")
    public User updateAvatar(@RequestParam Long userId, @RequestBody User user) throws Exception {
        return userService.updateAvatar(userId, user);
    }
//    @GetMapping("/all")
//    public List<User> getUsers() {
//        return userRepository.findAll();
//    }
//
//    @GetMapping("/{userId}")
//    public User getUserById(@PathVariable("userId") int id) throws Exception {
//        Optional<User> user = userRepository.findById(id);
//        if (user.isPresent()) {
//            return user.get();
//        }
//        throw new Exception("User not found: " + id);
//    }
//

//
//    @DeleteMapping("/{userId}")
//    public String deleteUser(@PathVariable("userId") int id) throws Exception {
//        Optional<User> user = userRepository.findById(id);
//
//        if (user.isEmpty()) {
//            throw new Exception("Not found user with id: " + id + " can't delete");
//        }
//
//        userRepository.delete(user.get());
//        return "User deleted successfully with id: " + id;
//    }
}
