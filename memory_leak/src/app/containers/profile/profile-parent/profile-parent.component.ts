import { Component, Input, OnInit } from '@angular/core';

import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
	selector: 'app-profile-parent',
	templateUrl: './profile-parent.component.html',
	styleUrls: ['./profile-parent.component.css']
})
export class ProfileParentComponent implements OnInit {
	@Input() user!: User;
	@Input() questions: Question[] = [];
	@Input() userFirstLetter!: string;

	constructor(private userService: UserService, private questionService: QuestionService) {
		this.userService.getUser().subscribe(user => {
			if (user) {
				this.user = user;
				this.userFirstLetter = this.user.displayName.charAt(0);
				this.questionService.getQuestions().subscribe(questions => {
					this.questions = [];
					questions.forEach(question => {
						if (question.askerID == this.user.uid) {
							this.questions.push(question);
						}
					})
				});
			}
		});
	}

	ngOnInit(): void { }

	deleteQuestion(question: Question) {
		this.questionService.removeQuestion(question);
	}
}
