import { DeleteWindowComponent } from './../delete-window/delete-window.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { PostWindowComponent } from '../post-window/post-window.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() post: Post;

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  update() {
    const modalRef = this.modal.open(PostWindowComponent);
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
    const modalRef = this.modal.open(DeleteWindowComponent);
    modalRef.componentInstance.id = this.post.id;
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
