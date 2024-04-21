package com.ts.tsProject.controller;

import com.ts.tsProject.dto.LoginRequestDTO;
import com.ts.tsProject.entity.User;
import com.ts.tsProject.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController

@AllArgsConstructor
public class AuthController {

    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        // Find user by username
        User user = userRepository.findUserByUserName(request.getUserName());

        if (user != null && user.getPassword().equals(request.getPassword())) {
            // Authentication successful
            return ResponseEntity.ok(user);
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
