package com.example.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

import com.example.server.domains.User;
import com.example.server.repositories.UserRepository;

@Service
public class AuthenticationService {


    @Value("${secretKey}")
    private String secretKey;

    @Value("${expire}")
    private long expire;

    @Autowired
    private UserRepository userRepository;

    public String getUsernameFromToken(String token) {
        if (token == null) {
            throw new RuntimeException("argument cannot be null");
        }
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String encrypt(String password, byte[] salt) {
        if (password == null || salt == null) {
            throw new RuntimeException("argument cannot be null");
        }
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            byte[] messageDigest = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : messageDigest) {
                sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] getSalt() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);
        return salt;
    }

    public String generateToken(User user) {
        if (user == null) {
            throw new RuntimeException("argument cannot be null");
        }
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expire))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public Optional<User> authenticate(String username, String password) {
        if (username == null || password == null) {
            throw new RuntimeException("argument cannot be null");
        }
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            return Optional.empty();
        }
        byte[] salt = user.get().getSalt();
        String loginPassword = encrypt(password, salt);
        if (!loginPassword.equals(user.get().getPassword())) {
            return Optional.empty();
        }
        return user;
    }

    public Boolean validateToken(String token) {
        String username;
        try {
            username = getUsernameFromToken(token);
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        } catch (Exception e) {
            return false;
        }
        return (userRepository.findByUsername(username).isPresent());
    }
}
