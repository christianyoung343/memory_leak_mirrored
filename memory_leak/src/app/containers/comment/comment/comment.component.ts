import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comments!: any[];

  constructor(private qs:QuestionService) { }

  ngOnInit(): void {
  }

}
