package com.example.server.controllers;

import java.util.List;

import com.example.server.domains.Post;
import com.example.server.services.AuthenticationService;
import com.example.server.services.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {
    
    @Autowired
    private PostService postService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<Object> addPost(@RequestBody Post post, @RequestHeader("authorization") String token) {
        try {
            Post savedPost = postService.addPost(post, token.substring(6));
            return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Object> updatePost(@RequestBody Post post) {
        Post updatedPost = null;
        try {
            updatedPost = postService.updatePost(post);
            if (updatedPost == null)
                return new ResponseEntity<>("POST NOT FOUND", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPost(@PathVariable Long id) {
        Post post = null;
        try {
            post = postService.getPost(id);
            if (post == null)
                return new ResponseEntity<>("POST NOT FOUND", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPostByAuthor(@RequestHeader("authorization") String token) {
        String username = authenticationService.getUsernameFromToken(token.substring(6));
        return new ResponseEntity<>(postService.getPostsByUser(username), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePost(@PathVariable Long id) {
        try {
            boolean deleted = postService.deletePostById(id);
            if (!deleted)
                return new ResponseEntity<>("POST NOT FOUND", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
