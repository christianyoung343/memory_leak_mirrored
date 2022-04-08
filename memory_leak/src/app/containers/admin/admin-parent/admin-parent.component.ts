import { Component, OnInit, Input } from '@angular/core';

import { QuestionService } from 'src/app/services/question.service'
import { UserService } from 'src/app/services/user.service'

import { Question } from 'src/models/question'
import { User } from 'src/models/user';

@Component({
	selector: 'app-admin-parent',
	templateUrl: './admin-parent.component.html',
	styleUrls: ['./admin-parent.component.css']
})
export class AdminParentComponent implements OnInit {
	@Input() userService!: UserService;
	
	user$: User | null | undefined;

	allQuestions: Question[] = [];
	@Input() flaggedQuestions: Question[] = [];

	constructor(private userServ: UserService, private questionService: QuestionService) { }

	ngOnInit(): void {
		this.userService = this.userServ;

		this.userService.getUser().subscribe(user => {
			this.user$ = user;
		})

		this.questionService.getQuestions().subscribe(questions => {
			this.allQuestions = questions;
			this.flaggedQuestions = this.allQuestions.filter(question => question.flag > 0);
		})
	}

}
