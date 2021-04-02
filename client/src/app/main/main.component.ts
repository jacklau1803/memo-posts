import { PostWindowComponent } from '../post-window/post-window.component';
import { PostsService } from '../posts.service';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  faPencil = faPencilAlt;

  constructor(public service: PostsService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.service.refreshPosts();
  }

  addPost() {
    const modalRef = this.modal.open(PostWindowComponent);
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
