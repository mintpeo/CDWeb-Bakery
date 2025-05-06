package com.example.fullstackweb.dto;
import com.example.fullstackweb.models.Address;
import com.example.fullstackweb.models.Avatar;
import com.example.fullstackweb.models.Cart;

import java.time.LocalDate;
import java.util.List;

public class UserDTO {
    private Long id;

    private String userName;

    private String email;

    private String fullName;

    private String numberPhone;

    private int status;

    private int gender;

    private LocalDate date;

    private Long addressDefault;

    private Avatar avatar;

    public UserDTO(Long id, String userName, String email, String fullName, String numberPhone, int status, int gender, LocalDate date, Long addressDefault, Avatar avatar) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.fullName = fullName;
        this.numberPhone = numberPhone;
        this.status = status;
        this.gender = gender;
        this.date = date;
        this.addressDefault = addressDefault;
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getAddressDefault() {
        return addressDefault;
    }

    public void setAddressDefault(Long addressDefault) {
        this.addressDefault = addressDefault;
    }

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar(Avatar avatar) {
        this.avatar = avatar;
    }
}
