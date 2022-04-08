import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Question } from 'src/models/question';
@Injectable({
	providedIn: 'root'
})
export class QuestionService implements OnInit {
	public questionsList$: Observable<Question[] | any[]>;
	public question: any;


	constructor(private afs: AngularFirestore) {
		this.questionsList$ = this.afs.collection('questions').valueChanges();
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
		})
		this.updateQuestion(question.uid, question);
	}

	updateQuestion(id: string, question: Question) {
		this.afs.collection('questions').doc(id).set(question)
	}

	removeQuestion(question: Question) {
		//TODO this; should remove answers and their comments, and then the question itself and its comments, then unlink from users
	}
}
