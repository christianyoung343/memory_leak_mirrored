import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

	constructor(private questionService: QuestionService, private userServ: UserService, private router: Router) { }

	ngOnInit(): void {
		this.userService = this.userServ;

		this.userService.getUser().subscribe(user => {
			this.user$ = user;
			if (this.user$ && !this.user$.admin) {
				this.router.navigate(['/']);
			}
		})

		this.questionService.getQuestions().subscribe(questions => {
			this.allQuestions = questions;
			this.flaggedQuestions = this.allQuestions.filter(question => question.flag > 0);
		})

		if (flags) {
			for (let flag of flags.flags) {
				this.reasons.push(flag.reason);
			}
		}
	}

	removeQuestion(questionToRemove: Question) {
		//! it is outside the scope of this component to deal with firestore; the question service must remove
		this.questionService.removeQuestion(questionToRemove);
	}

	notifyUser() {
		//TODO have notifications for users
	}
}
