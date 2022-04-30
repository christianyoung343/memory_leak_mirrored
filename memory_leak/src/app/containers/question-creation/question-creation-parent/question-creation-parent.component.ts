import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

import { QuestionCreationService } from 'src/app/services/question-creation.service';
import { UserService } from 'src/app/services/user.service';

import { Question } from 'src/models/question';

@Component({
	selector: 'app-question-creation-parent',
	templateUrl: './question-creation-parent.component.html',
	styleUrls: ['./question-creation-parent.component.css']
})
export class QuestionCreationParentComponent implements OnInit {
	@Input() questionForm: any;
	
	user: any;

	constructor(private questionCreationService: QuestionCreationService, private userService: UserService, 
				private router: Router) {
		this.questionForm = new FormGroup({
			title: new FormControl(""),
			body: new FormControl(""),
			anonymous: new FormControl(false)
		});
	}

	ngOnInit() {
		this.userService.getUser().subscribe(user => {
			this.user = user;
		});
	}

	addQuestion(data: any) {
		let question: Question = {
			acceptedAnswerID: '',
			anonymous: data.anonymous,
			askerID: this.user.uid,
			body: data.body,
			comments: [],
			flag: 0,
			title: data.title,
			uid: ''
		};

		this.questionCreationService.addQuestion(question).then(() => { }).then(() => {
			this.router.navigateByUrl('/question/' + this.questionCreationService.getQNum());
		});
	}
}
