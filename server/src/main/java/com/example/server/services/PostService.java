package com.example.server.services;

import java.util.List;
import java.util.Optional;

import com.example.server.domains.Post;
import com.example.server.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private AuthenticationService authenticationService;

    public Post addPost(Post post, String token) {
        if (post == null)
            throw new RuntimeException("POST CANNOT BE NULL");
        post.setAuthor(authenticationService.getUsernameFromToken(token));
        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
        if (post == null)
            throw new RuntimeException("POST CANNOT BE NULL");
        if (post.getId() == null) 
            throw new RuntimeException("POST ID CANNOT BE NULL");
        return postRepository.existsById(post.getId()) ? postRepository.save(post) : null;
    }

    public Post getPost(Long id) {
        if (id == null)
            throw new RuntimeException("ID CANNOT BE NULL");
        Optional<Post> post = postRepository.findById(id);
        return post.isPresent() ? post.get() : null;
    }

    public List<Post> getPostsByUser(String username) {
        return postRepository.findByAuthorOrderByIdDesc(username);
    }

    public Boolean deletePostById(Long id) {
        if (id == null) 
            throw new RuntimeException("ID CANNOT BE NULL");
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            postRepository.delete(post.get());
            return true;
        } else
            return false;
    }
}
