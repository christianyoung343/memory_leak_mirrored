import { Component, Input, OnInit } from '@angular/core';

import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';

import { AnswerService } from '../services/answer.service';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-individual-answer',
	templateUrl: './individual-answer.component.html',
	styleUrls: ['./individual-answer.component.css']
})
export class IndividualAnswerComponent implements OnInit {

	@Input() displayName!: string;
	@Input() text!: string;
	@Input() isAnonymous!: boolean;
	@Input() answer!: Answer;
	@Input() comments!: any[];
	@Input() askerID!: string;
	@Input() questionAnonymous!: boolean;
	@Input() accepted!: boolean;
	@Input() userID!: string;
	@Input() question!: Question;
	@Input() isAdmin!: boolean;

	constructor(private userService: UserService, private questionService: QuestionService, 
				private answerService: AnswerService) { }

	ngOnInit(): void {
		if (this.answer) {
			this.text = this.answer.body;
			this.comments = this.answer.comments;
			this.userService.getNameById(this.answer.answererID).then(name => { this.displayName = name });
		}
	}

	updateAcceptedAnswer() {
		if (this.answer.uid) {
			this.question.acceptedAnswerID = this.answer.uid;
		}

		this.questionService.updateQuestion(this.question.uid, this.question);
	}

	unacceptAnswer() {
		this.question.acceptedAnswerID = "";
		this.questionService.updateQuestion(this.question.uid, this.question);
	}

	getNumVotes(voteType: number) {
		return this.answerService.getNumVotes(this.answer, voteType);
	}

	getAnswerScore(): number {
		return this.answerService.getScore(this.answer);
	}

	voteAnswer(voteType: number) {
		this.userService.getUser().subscribe(user => {
			if (user) {
				this.answerService.voteAnswer(this.answer, user.uid, voteType);
			}
		})
	}

    removeAnswer(){
        if(this.answer){
          this.answerService.removeAnswer(this.answer);  
        }
    }
}
