import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Question } from 'src/models/question';
import { AnswerService } from './answer.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})

export class QuestionService implements OnInit {
    public questionsList$: Observable<Question[]>;
    public question: any;

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
        })
        this.updateQuestion(question.uid, question);
    }

    updateQuestion(id: string, question: Question) {
        this.angularFirestore.collection('questions').doc(id).set(question)
    }

	removeQuestion(question: Question) {
		//TODO this; should remove answers and their comments, and then the question itself and its comments, then unlink from users
		this.answerService.removeAnswersFromQuestion(question);
		this.userService.removeQuestionFromUser(question.uid);
		this.angularFirestore.collection('questions').doc<Question>(question.uid).delete();
	}

}
