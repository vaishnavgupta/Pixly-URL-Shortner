package com.pixly.shortnersb.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequestDto {
    private String username;
    private String password;
    private String email;
    private Set<String> role;
}
