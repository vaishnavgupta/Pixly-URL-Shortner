package com.pixly.shortnersb.dto;

import lombok.Data;

import java.util.Set;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
