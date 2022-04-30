import { Component, Input, OnInit } from '@angular/core';

import { AnswerService } from 'src/app/services/answer.service';
import { UserService } from 'src/app/services/user.service';

import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
	selector: 'app-answer-parent',
	templateUrl: './answer-parent.component.html',
	styleUrls: ['./answer-parent.component.css']
})
export class AnswerParentComponent implements OnInit {

	@Input() answers!: Answer[];
	@Input() question!: Question;

	newAnswerText: string = "";

	@Input() user!: User;
	@Input() isAdmin!: boolean;

	constructor(private answerService: AnswerService, private userService: UserService) { }

	ngOnInit(): void {
		this.userService.getUser().subscribe(user => {
			if (user != undefined && user != null) {
				this.user = user;
			}
		});

	}

	updateAnswer(answer: string) {
		let userID = "";
		if (this.user != null) {
			userID = this.user?.uid;
		}

		this.answerService.addAnswer(answer, this.question, userID);
		this.newAnswerText = "";
	}
}
