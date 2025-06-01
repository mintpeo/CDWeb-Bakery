package com.example.fullstackweb.service;

import com.example.fullstackweb.dto.LoginResponse;
import com.example.fullstackweb.dto.UserDTO;
import com.example.fullstackweb.dto.UserPasswordUpdateDTO;
import com.example.fullstackweb.dto.UserUpdateDTO;
import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Locale;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageSource messageSource;

//    public Optional<User> getInfoUser(Long id) {
//        return userRepository.findById(id);
//    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUserName(),
                user.getEmail(),
                user.getFullName(),
                user.getNumberPhone(),
                user.getStatus(),
                user.getGender(),
                user.getDate(),
                user.getAddressDefault(),
                user.getAvatar()
        );
    }

    public UserDTO getInfoUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            return convertToDTO(user);
        }
        return null;
    }

    // create user
    public Boolean createUser(User user) {
        User newUser = new User();

        newUser.setUserName(user.getUserName());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
//        newUser.setFullName(user.getFullName());
//        newUser.setNumberPhone(user.getNumberPhone());
        newUser.setStatus(1);
        newUser.setGender(2);
//        newUser.setDate(user.getDate());
//        newUser.setAddressDefault(user.getAddressDefault());
//        newUser.setAddresses(user.getAddresses());

        userRepository.save(newUser);
        return true;
    }

    // create with validation
//    public String register(User user, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            // Lấy lỗi đầu tiên để đơn giản
//            return bindingResult.getFieldError().getDefaultMessage();
//        } else {
//            User newUser = new User();
//
//            newUser.setUserName(user.getUserName());
//            newUser.setPassword(user.getPassword());
//            newUser.setEmail(user.getEmail());
//            newUser.setStatus(1);
//            newUser.setGender(2);
//
//            userRepository.save(newUser);
//        }
//        // Nếu hợp lệ thì xử lý logic tiếp
//        return "True";
//    }

    public String register(User user, BindingResult bindingResult, String lang) {
        Locale locale = Locale.forLanguageTag(lang);

        if (bindingResult.hasErrors()) {
            FieldError error = bindingResult.getFieldError();
            if (error != null) {
                return messageSource.getMessage(error, locale); // lấy theo locale
            }
        } else {
            User newUser = new User();
            newUser.setUserName(user.getUserName());
            newUser.setPassword(user.getPassword());
            newUser.setEmail(user.getEmail());
            newUser.setStatus(1);
            newUser.setGender(2);
            userRepository.save(newUser);
        }
        return "True";
    }


    // exist user name
    public Boolean checkUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    // login
    public ResponseEntity<?> loginUser(User user) {
        Optional<User> newUser = userRepository.findByUserName(user.getUserName()); // kiem tra username
        if (newUser.isPresent() && newUser.get().getPassword().equals(user.getPassword())) { // kiem tra password
            Long id = newUser.get().getId();
            int status = newUser.get().getStatus();

            LoginResponse response = new LoginResponse(id, status);
            return ResponseEntity.ok(response);
        }
        return null;
    }

    // verify
    public Boolean verifyPass(User user) {
        Optional<User> newUser = userRepository.findById(user.getId()); // kiem tra username
        return newUser.isPresent() && newUser.get().getPassword().equals(user.getPassword()); // kiem tra password
    }


    // update user
//    public User updateUser(Long userId, User user) throws Exception {
//        Optional<User> userById = userRepository.findById(userId);
//        if (userById.isEmpty()) throw new Exception("User not found: " + userId);
//
//        User oldUser = userById.get();
//        oldUser.setEmail(user.getEmail());
//        oldUser.setFullName(user.getFullName());
//        oldUser.setNumberPhone(user.getNumberPhone());
//        oldUser.setGender(user.getGender());
//        oldUser.setDate(user.getDate());
//
//        return userRepository.save(oldUser);
//    }

    public String updateUser(Long userId, UserUpdateDTO userUpdateDTO, BindingResult bindingResult, String lang) throws Exception {
        Optional<User> userById = userRepository.findById(userId);
        if (userById.isEmpty()) {
            throw new Exception("User not found: " + userId);
        } else {
            Locale locale = Locale.forLanguageTag(lang);

            if (bindingResult.hasErrors()) {
                FieldError error = bindingResult.getFieldError();
                if (error != null) {
                    return messageSource.getMessage(error, locale); // lấy theo locale
                }
            } else {
                User oldUser = userById.get();
                oldUser.setEmail(userUpdateDTO.getEmail());
                oldUser.setFullName(userUpdateDTO.getFullName());
                oldUser.setNumberPhone(userUpdateDTO.getNumberPhone());
                oldUser.setGender(userUpdateDTO.getGender());
                oldUser.setDate(userUpdateDTO.getDate());
                userRepository.save(oldUser);
            }
        }

        return "True";
    }

    // update avatar
    public User updateAvatar(Long userId, User user) throws Exception {
        Optional<User> userById = userRepository.findById(userId);
        if (userById.isEmpty()) throw new Exception("User not found: " + userId);

        User oldUser = userById.get();
        oldUser.setAvatar(user.getAvatar());

        return userRepository.save(oldUser);
    }

    // updata pass
//    public Boolean updatePass(Long userId, String oldPass, String newPass) {
//        Optional<User> userById = userRepository.findById(userId);
//        if (userById.isPresent() && userById.get().getPassword().equals(oldPass)) { // kiem tra password
//            User oldUser = userById.get();
//            oldUser.setPassword(newPass);
//            userRepository.save(oldUser);
//            return true;
//        }
//        return false;
//    }

    public String updatePass(Long userId, UserPasswordUpdateDTO userPasswordUpdateDTO, BindingResult bindingResult, String lang) {
        Optional<User> userById = userRepository.findById(userId);
        if (userById.isPresent() && userById.get().getPassword().equals(userPasswordUpdateDTO.getOldPassword())) {
            Locale locale = Locale.forLanguageTag(lang);

            if (bindingResult.hasErrors()) {
                FieldError error = bindingResult.getFieldError();
                if (error != null) {
                    return messageSource.getMessage(error, locale); // lấy theo locale
                }
            } else {
                User oldUser = userById.get();
                oldUser.setPassword(userPasswordUpdateDTO.getNewPassword());
                userRepository.save(oldUser);
                return "True";
            }
        }
        return "False";
    }

    // update address default
    public Boolean updateAddressDefault(Long userId, Long addressDefaultId) throws Exception {
        Optional<User> userById = userRepository.findById(userId);
        if (userById.isEmpty()) throw new Exception("User not found: " + userId);

        User oldUser = userById.get();
        oldUser.setAddressDefault(addressDefaultId);

        userRepository.save(oldUser);
        return true;
    }
}
