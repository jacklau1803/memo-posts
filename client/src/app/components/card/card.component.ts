import { PostService } from './../../services/post.service';
import { ConfirmationWindowComponent } from '../confirmation-window/confirmation-window.component';
import { Component, Input, OnInit } from '@angular/core';
import { EditWindowComponent } from '../edit-window/edit-window.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() post: Post;

  constructor(private modal: NgbModal, private postService: PostService) { }

  ngOnInit(): void {
  }

  update() {
    const modalRef = this.modal.open(EditWindowComponent);
    modalRef.componentInstance.defaultPost = this.post;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }).catch((error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  delete() {
    const modalRef = this.modal.open(ConfirmationWindowComponent);
    modalRef.componentInstance.msg = 'Do you really want to delete this post?';
    modalRef.componentInstance.btn = {
      name: 'Delete',
      function: cb => {
        this.postService.deletePost(this.post.id).subscribe({
          next: () => {
            this.postService.refreshPosts();
            cb();
          },
          error: err => {
            alert('Failed to delete.');
          }
        })
      }
    };
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }).catch((error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
