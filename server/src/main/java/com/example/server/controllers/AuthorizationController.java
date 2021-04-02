package com.example.server.controllers;

import java.util.Map;
import java.util.Optional;

import com.example.server.domains.User;
import com.example.server.services.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class AuthorizationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestParam String username, @RequestParam String password) {
        if (username == "" || password == "") {
            return new ResponseEntity<>("LOGIN INFORMATION NOT VALID", HttpStatus.BAD_REQUEST);
        }
        Optional<User> user = authenticationService.authenticate(username, password);
        if (!user.isPresent()) {
            return new ResponseEntity<>("USER NOT FOUND", HttpStatus.NOT_FOUND);
        }
        String token = authenticationService.generateToken(user.get());
        Map<String, String> returnInfo = Map.of("username", username, "token", token);
        return new ResponseEntity<>(returnInfo, HttpStatus.OK);
    }

    @PostMapping("/verify/{token}")
    public ResponseEntity<Object> verify(@PathVariable String token) {
        return token != "" && authenticationService.validateToken(token) ? new ResponseEntity<>(
                Map.of("username", authenticationService.getUsernameFromToken(token), "token", token), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
