import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  public newCommentText: string = "";

  @Input() comments!: any[];
  @Input() question!: Question;
  @Input() answer!: Answer;
  @Input() user!: User;
  @Input() commentOnAnswer!: boolean;
  public uid: string | undefined;

  constructor(private qs:QuestionService, private us: UserService) { }

  ngOnInit(): void {
    this.us.getUser().subscribe(u =>{
      if(u != undefined && u != null){
        this.user = u;
      }
    });
  }

  addComment(comment: string){
    if (this.commentOnAnswer) {

    } else {
      this.qs.addCommentToQuestion(comment,this.question,this.user.uid);
      this.newCommentText="";
    }
  }
}
