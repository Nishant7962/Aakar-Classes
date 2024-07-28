package com.example.Aakar.service;

import com.example.Aakar.model.User;

public interface UserService {
    User registerUser(User user);
    User loginUser(String email, String password);
}
