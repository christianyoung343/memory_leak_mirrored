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
		this.answerService.removeAnswersFromQuestion(question);
		this.userService.removeQuestionFromUser(question.uid);
		this.angularFirestore.collection('questions').doc<Question>(question.uid).delete();
	}

    removeCommentFromQuestion(question: Question, comment: string, userID: string){
        // let com: Comment = comment;
        for(let i=0;i<question.comments.length;i++){
            if(question.comments[i].comment == comment && question.comments[i].userID == userID){
                console.log("Location in the comments array: "+ i);
                question.comments.splice(i,1);
            }
        }

        this.updateQuestion(question.uid, question);
    }

	voteQuestion(question: Question, userID: string, voteType: number) {
		if(!question.votes) {
			question.votes = [];
		}

		//voteType: can be 0 or 1; 0 is downvote, 1 is upvote
		for(let voteInfo of question.votes) {
			//for when the user has already voted on this question
			if(voteInfo.userID === userID) {
				//for when the vote types are the same
				if(voteInfo.voteType === voteType) {
					//allow user to undo their vote
					let voteIndex = question.votes.indexOf(voteInfo, 0);

					if(voteIndex > -1) {
						question.votes.splice(voteIndex, 1);
					}
					
					return;
				}
				//allow changing vote type
				else {
					voteInfo.voteType = voteType;
					this.updateQuestion(question.uid, question);
					return;
				}
			}
		}

		//will only get here if the user has not voted on this question before
		question.votes.push({
			"userID": userID,
			"voteType": voteType
		});
		
		this.updateQuestion(question.uid, question);
	}

	getScore(question: Question): number {
		let upvotes: number = 0;
		let downvotes: number = 0;

		if(question.votes) {
			for(let voteInfo of question.votes) {
				if(voteInfo.voteType === 0) {
					downvotes++;
				}
				else {
					upvotes++;
				}
			}
		}

		return upvotes - downvotes;
	}
}
