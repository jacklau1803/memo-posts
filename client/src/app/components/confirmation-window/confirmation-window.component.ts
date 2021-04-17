import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.css']
})
export class ConfirmationWindowComponent implements OnInit {
  @Input() msg;
  @Input() btn?;
  faTimes = faTimes;

  constructor(private service: PostService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
