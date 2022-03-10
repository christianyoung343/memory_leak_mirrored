import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';


@Injectable({
    providedIn: 'root'
})
export class AnswerService implements OnInit {
    public answerList$: Observable<Answer[] | any[]>;

    constructor(private afs: AngularFirestore) {
        this.answerList$ = this.afs.collection('answers').valueChanges();
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

    deleteAnswer() {
        //needs to delete an answer from the database
    }
}
