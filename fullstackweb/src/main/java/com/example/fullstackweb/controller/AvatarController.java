package com.example.fullstackweb.controller;

import com.example.fullstackweb.models.Avatar;
import com.example.fullstackweb.service.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import static com.example.fullstackweb.models.Status.API;

@RestController
@RequestMapping(path = "/avatars")
@CrossOrigin(origins = API)
public class AvatarController {
    @Autowired
    AvatarService avatarService;

    @GetMapping(path = "/all")
    public List<Avatar> getAllAvatar() {
        return avatarService.getAllAvatar();
    }
}
