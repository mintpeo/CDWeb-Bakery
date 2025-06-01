package com.example.fullstackweb.controller;

import com.example.fullstackweb.dto.UserDTO;
import com.example.fullstackweb.dto.UserPasswordUpdateDTO;
import com.example.fullstackweb.dto.UserUpdateDTO;
import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.UserRepository;
import com.example.fullstackweb.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
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
    public UserDTO getInfoUser(@RequestParam Long id) {
        return userService.getInfoUser(id);
    }

//    @PostMapping("/create")
//    public Boolean createUser(@RequestBody User user) {
//        return userService.createUser(user);
//    }

    // create with validation
    @PostMapping(value = "/vali", produces = "text/plain;charset=UTF-8")
    public String createVali (@Valid @RequestBody User user, BindingResult bindingResult, @RequestParam String lang) {
        return userService.register(user, bindingResult, lang);
    }

    @GetMapping("/check")
    public Boolean checkUserName(@RequestParam String userName) {
        return userService.checkUserName(userName);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @PostMapping("/verify")
    public Boolean verifyPass(@RequestBody User user) {
        return userService.verifyPass(user);
    }

    @PutMapping("/update")
    public String updateUser(@RequestParam Long userId, @Valid @RequestBody UserUpdateDTO user, BindingResult bindingResult, @RequestParam String lang) throws Exception {
        return userService.updateUser(userId, user, bindingResult, lang);
    }
//    public User updateUser(@RequestParam Long userId, @RequestBody User user) throws Exception {
//        return userService.updateUser(userId, user, bindingResult, lang);
//    }

    @PutMapping("/updateAvatar")
    public User updateAvatar(@RequestParam Long userId, @RequestBody User user) throws Exception {
        return userService.updateAvatar(userId, user);
    }

    @PutMapping("/updatePass")
    public String updatePass(@RequestParam Long userId, @Valid @RequestBody UserPasswordUpdateDTO user, BindingResult bindingResult, @RequestParam String lang) throws Exception {
        return userService.updatePass(userId, user, bindingResult, lang);
    }
//    public Boolean updatePass(@RequestParam Long userId, String oldPass, String newPass) {
//        return userService.updatePass(userId, oldPass, newPass);
//    }

    @PutMapping("/updateAddressDefault")
    public Boolean updateAddressDefault(@RequestParam Long userId, Long addressDefaultId) throws Exception {
        return userService.updateAddressDefault(userId, addressDefaultId);
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
