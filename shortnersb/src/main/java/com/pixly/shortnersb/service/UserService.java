package com.pixly.shortnersb.service;

import com.pixly.shortnersb.dto.LoginRequestDto;
import com.pixly.shortnersb.models.User;
import com.pixly.shortnersb.repository.UserRepository;
import com.pixly.shortnersb.security.jwt.JwtAuthResponse;
import com.pixly.shortnersb.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthResponse loginUser(LoginRequestDto loginRequestDto){
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getUsername(),
                        loginRequestDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserDetailsImpl userDetails =(UserDetailsImpl) authenticate.getPrincipal();
        String jwtToken = jwtUtils.generateJwtToken(userDetails);
        return new JwtAuthResponse(jwtToken);
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid Username"));
    }
}
