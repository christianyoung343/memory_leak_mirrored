import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';

@Injectable({
	providedIn: 'root'
})
export class AnswerService implements OnInit {
	answerList$: Observable<Answer[]>;

	constructor(private angularFirestore: AngularFirestore) {
		this.answerList$ = this.angularFirestore.collection<Answer>('answers').valueChanges();

	}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	getAnswers() {
		return this.answerList$;
	}

	addAnswer(answer: string, question: Question, userID: string) {
		let ansDoc: Answer = {
			answererID: userID,
			body: answer,
			comments: [],
			questionID: question.uid,
			uid: ''
		}

		this.angularFirestore.collection('answers').add(ansDoc).then((docRef) => {
			docRef.get().then((docSnapshot) => {
				this.angularFirestore.collection('answers').doc<Answer>(docSnapshot.id).update({
					uid: docSnapshot.id
				});
			});
		});
	}

	addCommentToAnswer(comment: string, answer: Answer, userID: string) {
		answer.comments.push({
			"userID": userID,
			"comment": comment
		});

		if (answer.uid) {
			this.updateAnswer(answer.uid, answer);
		}
	}

	updateAnswer(id: string, answer: Answer) {
		this.angularFirestore.collection('answers').doc(id).set(answer);
	}

	removeCommentFromAnswer(answer: Answer, comment: string, userID: string) {
		for (let i = 0; i < answer.comments.length; i++) {
			if (answer.comments[i].comment == comment && answer.comments[i].userID == userID) {
				answer.comments.splice(i, 1);
			}
		}

		if (answer.uid) {
			this.updateAnswer(answer.uid, answer);
		}
	}
	
	removeAnswersFromQuestion(question: Question) {
		//needs to delete an answer from the database
		this.answerList$.subscribe(answers => {
			//loop through answers, and only delete the document if its questionID matches the flagged question's ID
			answers.forEach(answer => {
				if (answer.questionID === question.uid) {
					this.angularFirestore.collection('answers').doc<Answer>(answer.uid).delete();
				}
			});
		});
    }

    removeAnswer(answer: Answer){
        //FINISH ME
    }

	voteAnswer(answer: Answer, userID: string, voteType: number) {
		if (!answer.votes) {
			answer.votes = [];
		}

		//voteType: can be 0 or 1; 0 is downvote, 1 is upvote
		for (let voteInfo of answer.votes) {
			//for when the user has already voted on this question
			if (voteInfo.userID === userID) {
				//for when the vote types are the same
				if (voteInfo.voteType === voteType) {
					//allow user to undo their vote
					let voteIndex = answer.votes.indexOf(voteInfo, 0);

					if (voteIndex > -1) {
						answer.votes.splice(voteIndex, 1);
					}

					return;
				}
				//allow changing vote type
				else {
					voteInfo.voteType = voteType;

					if (answer.uid) {
						this.updateAnswer(answer.uid, answer);
					}

					return;
				}
			}
		}

		//will only get here if the user has not voted on this question before
		answer.votes.push({
			"userID": userID,
			"voteType": voteType
		});

		if (answer.uid) {
			this.updateAnswer(answer.uid, answer);
		}
	}

	getScore(answer: Answer): number {
		if (!answer) {
			return 0;
		}

		if (!answer.votes) {
			answer.votes = [];
		}

		let upvotes: number = 0;
		let downvotes: number = 0;

		for (let voteInfo of answer.votes) {
			if (voteInfo.voteType === 0) {
				downvotes++;
			}
			else {
				upvotes++;
			}
		}

		return upvotes - downvotes;
	}

	getNumVotes(answer: Answer, voteType: number): number {
		let numVotes = 0;

		if (!answer) {
			return 0;
		}

		if (!answer.votes) {
			answer.votes = [];
		}

		for (let voteInfo of answer.votes) {
			if (voteInfo.voteType === voteType) {
				numVotes++;
			}
		}

		return numVotes;
	}
}