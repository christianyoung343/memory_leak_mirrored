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

	@Input() comments!: any[];
	@Input() question!: Question;
	@Input() answer!: Answer;
	@Input() user!: User;
	@Input() commentOnAnswer!: boolean;
	@Input() askerID!: string;
	@Input() questionAnonymous!: boolean;
	@Input() isAdmin!: boolean;
  @Input() uniqueID: string;

	uid: string | undefined;

  constructor(private qs:QuestionService, private us: UserService, private as: AnswerService) { 
    this.uniqueID = 'label' + Date.now();
  }

	ngOnInit(): void {
		this.us.getUser().subscribe(user => {
			if (user != undefined && user != null) {
				this.user = user;
			}
		});
	}

	addComment(comment: string) {
		if (this.commentOnAnswer) {
			this.as.addCommentToAnswer(comment, this.answer, this.user.uid);
			this.newCommentText = "";
		}
		else {
			this.qs.addCommentToQuestion(comment, this.question, this.user.uid);
			this.newCommentText = "";
		}
	}
}
