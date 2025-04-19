package com.example.fullstackweb.service;

import com.example.fullstackweb.models.Avatar;
import com.example.fullstackweb.models.Product;
import com.example.fullstackweb.models.User;
import com.example.fullstackweb.repository.AvatarRepository;
import com.example.fullstackweb.repository.ProductRepository;
import com.example.fullstackweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvatarService {
    @Autowired
    private AvatarRepository avatarRepository;

    public List<Avatar> getAllAvatar() {
        return avatarRepository.findAll();
    }

}
