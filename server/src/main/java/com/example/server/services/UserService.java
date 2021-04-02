package com.example.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.server.domains.User;
import com.example.server.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationService authenticationService;
    public Long addUser(User user) {
        if (user == null)
            throw new RuntimeException("USER CANNOT BE NULL");
        user.setSalt(authenticationService.getSalt());
        user.setPassword(authenticationService.encrypt(user.getPassword(),user.getSalt()));
        return userRepository.save(user).getId();
    }

    public User updateUser(User user) {
        if (user == null)
            throw new RuntimeException("USER CANNOT BE NULL");
        if (user.getId() == null) 
            throw new RuntimeException("USER ID CANNOT BE NULL");
        return userRepository.existsById(user.getId()) ? userRepository.save(user) : null;
    }

    public User getUserById(Long id) {
        if (id == null)
            throw new RuntimeException("ID CANNOT BE NULL");
        Optional<User> user = userRepository.findById(id);
        return user.isPresent() ? user.get() : null;
    }

    public User getCensoredUserById(Long id) {
        User oUser = getUserById(id);
        User user = new User();
        user.setId(oUser.getId());
        user.setUsername(oUser.getUsername());
        return user;
    }
}
