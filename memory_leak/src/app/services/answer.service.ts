import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Answer } from 'src/models/answer';


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

  getAnswers(){
    return this.answerList$;
  }
  
}
