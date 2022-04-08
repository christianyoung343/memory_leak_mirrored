import { Component, OnInit, Input } from '@angular/core';

import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

import { Question } from 'src/models/question';
import { User } from 'src/models/user';

import flags from 'src/app/services/flags.json'

@Component({
	selector: 'app-admin-parent',
	templateUrl: './admin-parent.component.html',
	styleUrls: ['./admin-parent.component.css']
})
export class AdminParentComponent implements OnInit {
	user$: User | null | undefined;

	allQuestions: Question[] = [];
	@Input() flaggedQuestions: Question[] = [];
	@Input() reasons: string[] = [];

	@Input() userService!: UserService;

	constructor(private questionService: QuestionService, private userServ: UserService) { }

	ngOnInit(): void {
		this.userService = this.userServ;

		this.userService.getUser().subscribe(user => {
			this.user$ = user;
		})

		this.questionService.getQuestions().subscribe(questions => {
			this.allQuestions = questions;
			this.flaggedQuestions = this.allQuestions.filter(question => question.flag > 0);
		})

		for(let flag of flags.flags) {
			this.reasons.push(flag.reason);
		}
	}

	removeQuestion(questionToRemove: Question) {
		//! it is outside the scope of this component to deal with firestore; the question service must remove
		this.questionService.removeQuestion(questionToRemove);
		this.userService.removeQuestionFromUser(questionToRemove.uid);
	}

	notifyUser() {
		//TODO have notifications for users
	}
}
