import { Component, Input, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/services/answer.service';
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

  @Input() public comments!: any[];
  @Input() public question!: Question;
  @Input() public answer!: Answer;
  @Input() public user!: User;
  @Input() public commentOnAnswer!: boolean;
  @Input() public askerID!: string;
  @Input() public questionAnonymous!: boolean;
  @Input() public isAdmin!: boolean;

  public uid: string | undefined;

  constructor(private qs:QuestionService, private us: UserService, private as: AnswerService) { }

  ngOnInit(): void {
    this.us.getUser().subscribe(u =>{
      if(u != undefined && u != null){
        this.user = u;
      }
    });
  }

  addComment(comment: string){
    if (this.commentOnAnswer) {
        this.as.addCommentToQuestion(comment,this.answer,this.user.uid);
        this.newCommentText="";
    } else {
      this.qs.addCommentToQuestion(comment,this.question,this.user.uid);
      this.newCommentText="";
    }
  }
}
