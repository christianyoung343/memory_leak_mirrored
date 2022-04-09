import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';

@Injectable({
    providedIn: 'root'
})
export class AnswerService implements OnInit {
    public answerList$: Observable<Answer[]>;

    constructor(private afs: AngularFirestore) {
        this.answerList$ = this.afs.collection<Answer>('answers').valueChanges();
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

        this.afs.collection('answers').add(ansDoc).then((a) => {
            a.get().then((b) => {
                this.afs.collection('answers').doc<Answer>(b.id).update({
                    uid: b.id
                })
            })
        });
    }

    addCommentToQuestion(comment: string, answer:Answer, userID: string){
        answer.comments.push({
          "userID": userID,
          "comment": comment})
        if (answer.uid) {
            this.updateAnswer(answer.uid,answer);
        }
      }
    
      updateAnswer(id: string, answer: Answer) {
        this.afs.collection('answers').doc(id).set(answer)
      }

    removeAnswersFromQuestion(question: Question) {
        //needs to delete an answer from the database
		
		this.answerList$.subscribe(answers => {
			//loop through answers, and only delete the document if its questionID matches the flagged question's ID
			answers.forEach(answer => {
				if(answer.questionID === question.uid) {
					this.afs.collection('answers').doc<Answer>(answer.uid).delete();
				}
			})
		})

    }
}
