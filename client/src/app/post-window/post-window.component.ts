import { Post } from './../model/Post';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-window',
  templateUrl: './post-window.component.html',
  styleUrls: ['./post-window.component.css']
})
export class PostWindowComponent implements OnInit {
  post: FormGroup;
  faTimes = faTimes;
  @Input() defaultPost?;

  constructor(private service: PostsService, public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.post = new FormGroup({
      title: new FormControl(this.defaultPost?.title, [Validators.required]),
      body: new FormControl(this.defaultPost?.body, [Validators.required])
    });
  }

  savePost() {
    if (this.post.get('title').invalid) {
      alert('Please enter title.');
      return;
    } else if (this.post.get('body').invalid) {
      alert('Please enter content.');
      return;
    }
    if (!this.defaultPost) {
      this.service.createPost(this.post.value).subscribe((result: Post) => {
        this.service.pushPost(result);
        this.modal.close();
      });
    } else {
      if (this.defaultPost.title === this.post.get('title').value && this.defaultPost.body === this.post.get('body').value) {
        this.modal.close();
        return;
      }
      this.defaultPost.title = this.post.get('title').value;
      this.defaultPost.body = this.post.get('body').value;
      this.service.updatePost(this.defaultPost).subscribe((result: Post) => {
        this.service.refreshPosts();
        this.modal.close();
      });
    }
  }
}
