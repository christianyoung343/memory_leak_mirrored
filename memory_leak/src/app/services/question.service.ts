import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { AnswerService } from 'src/app/services/answer.service'
import { UserService } from 'src/app/services/user.service'

import { Question } from 'src/models/question';

@Injectable({
	providedIn: 'root'
})
export class QuestionService implements OnInit {
	questionsList$: Observable<Question[]>;
	question: any;

	constructor(private angularFirestore: AngularFirestore, private answerService: AnswerService, private userService: UserService) {
		this.questionsList$ = this.angularFirestore.collection<Question>('questions').valueChanges();
	}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	getQuestions() {
		return this.questionsList$;
	}

	addCommentToQuestion(comment: string, question: Question, userID: string) {
		question.comments.push({
			"userID": userID,
			"comment": comment
		});

		this.updateQuestion(question.uid, question);
	}

	updateQuestion(id: string, question: Question) {
		this.angularFirestore.collection('questions').doc(id).set(question);
	}

	removeQuestion(question: Question) {
		this.answerService.removeAnswersFromQuestion(question);
		this.userService.removeQuestionFromUser(question.uid);
		this.angularFirestore.collection('questions').doc<Question>(question.uid).delete();
	}

	removeCommentFromQuestion(question: Question, comment: string, userID: string) {
		for (let i = 0; i < question.comments.length; i++) {
			if (question.comments[i].comment == comment && question.comments[i].userID == userID) {
				question.comments.splice(i, 1);
			}
		}
		
		this.updateQuestion(question.uid, question);
	}
}
