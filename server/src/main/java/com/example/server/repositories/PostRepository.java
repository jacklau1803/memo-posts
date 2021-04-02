package com.example.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.server.domains.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByAuthorOrderByIdDesc(String author);

}
