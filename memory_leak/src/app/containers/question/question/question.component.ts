import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	questions: Question[] = [];
	uid: string | any;
	allAnswers: Answer[] = [];

	@Input() userDisplayName!: string;

	@Input() question!: Question;
	@Input() comments!: Array<{ userID: string, comment: string }>;
	@Input() answers: Answer[] = [];

	@Input() user!: User;

    constructor(private questionService: QuestionService, private answerService: AnswerService, private userService: UserService,
        private route: ActivatedRoute, private router:Router) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.uid = (params.get('id'));
		});

		this.questionService.getQuestions().subscribe(questions => {
			this.questions = questions;

			for (let i = 0; i < this.questions.length; i++) {
				if (this.questions[i].uid === this.uid) {
					this.question = this.questions[i];

					this.userService.getNameById(this.question.askerID).then(name => {
						this.userDisplayName = name;
					});

					this.comments = this.question.comments;
				}
			}
		});

		this.answerService.getAnswers().subscribe(answers => {
			this.answers = [];
			this.allAnswers = answers;

			for (let j = 0; j < this.allAnswers.length; j++) {
				if (this.allAnswers[j].questionID == this.question.uid) {
					this.answers.push(this.allAnswers[j]);
				}
			}
		});

		this.userService.getUser().subscribe(user => {
			if (user) {
				this.user = user;
			}
		});
	}

    alertFunction(): void {
        if (this.question) {
            if (this.question.flag > 0) {
                alert("This question has already been flagged. A moderator will review it as soon as possible.")
            } else {
                var response = null
                do {
					response = prompt("Enter the reason for flagging (1-4):\n  1. Question is rude/inappropriate\n  2. Question encourages academic misconduct\n  3. Question has been answered previously\n  4. An answer for this question is rude, inappropriate, and/or encourages academic misconduct\n");

					const valid_responses = [1, 2, 3, 4];
					var invalid = true;

					try {
						invalid = !(valid_responses.includes(Number(response)));
					}
					catch {
						invalid = true;
					}
				}
				while (invalid && response);
				
				if (response) {
					this.question.flag = Number(response);
					this.questionService.updateQuestion(this.question.uid, this.question);
				}
			}
		}
	}

    removeQuestion(){
        if(this.question){
            this.questionService.removeQuestion(this.question);          
        }
        this.router.navigate(['/']);
    }
}
