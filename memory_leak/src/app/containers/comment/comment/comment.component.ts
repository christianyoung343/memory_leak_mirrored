import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
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
  public user!: User;
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
    this.qs.addCommentToQuestion(comment,this.question,this.user.uid);
    this.newCommentText="";
  }
}
