package com.example.fullstackweb.repository;

import com.example.fullstackweb.models.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Integer> {
}
