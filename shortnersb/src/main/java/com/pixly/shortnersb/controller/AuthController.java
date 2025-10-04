package com.pixly.shortnersb.controller;

import com.pixly.shortnersb.dto.LoginRequestDto;
import com.pixly.shortnersb.dto.RegisterRequestDto;
import com.pixly.shortnersb.models.User;
import com.pixly.shortnersb.security.jwt.JwtAuthResponse;
import com.pixly.shortnersb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto registerDto){
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(registerDto.getPassword());
        user.setEmail(registerDto.getEmail());
        user.setRole("ROLE_USER");

        User retUser = userService.registerUser(user);
        return ResponseEntity.ok(retUser);
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequestDto){
        JwtAuthResponse jwtAuthResponse = userService.loginUser(loginRequestDto);
        return ResponseEntity.ok(jwtAuthResponse);
    }
}
