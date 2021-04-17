import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/post.service';
import { EditWindowComponent } from '../edit-window/edit-window.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  faPencil = faPencilAlt;

  constructor(public service: PostService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.service.refreshPosts();
  }

  addPost() {
    const modalRef = this.modal.open(EditWindowComponent);
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
