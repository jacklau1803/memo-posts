import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-delete-window',
  templateUrl: './delete-window.component.html',
  styleUrls: ['./delete-window.component.css']
})
export class DeleteWindowComponent implements OnInit {
  @Input() id;
  faTimes = faTimes;

  constructor(private service: PostsService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deletePost() {
    this.service.deletePost(this.id).subscribe(result => {
      this.service.refreshPosts();
      this.modal.close();
    },
    err => {
      alert('Failed to delete.');
    });
  }
}
