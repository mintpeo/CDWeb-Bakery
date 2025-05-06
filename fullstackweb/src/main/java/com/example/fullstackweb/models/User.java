package com.example.fullstackweb.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "accounts")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable=false)
//    @NotEmpty(message = "User Name ko dc de null")
    private String userName;

    @Column(name = "password", nullable = false)
//    @Size(min = 8, message = "Password min 8")
    private String password;

    @Column(name = "email")
    @Email(message = "Email ko hop le")
    private String email;

    @Column(name = "fullname")
//    @Pattern(regexp = "^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$", message = "Tên chỉ được chứa chữ cái và không được có số hoặc ký tự đặc biệt")
    private String fullName;

    @Column(name = "numberphone")
//    @Pattern(regexp = "^\\d{10,11}$", message = "Số điện thoại phải gồm 10 hoặc 11 chữ số")
    private String numberPhone;

    @Column(name = "status")
    private int status;

    @Column(name = "gender")
    private int gender;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "address-default")
    private Long addressDefault;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> addresses;

    @OneToOne
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;

    public User(){}

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
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

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar(Avatar avatar) {
        this.avatar = avatar;
    }
}


