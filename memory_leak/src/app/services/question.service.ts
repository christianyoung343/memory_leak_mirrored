import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Question } from 'src/models/question';
@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnInit {
  public questionsList$: Observable<Question[] | any[]>;
  public question :any;


  constructor(private afs: AngularFirestore) {
    this.questionsList$ = this.afs.collection('questions').valueChanges();
   }
    
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getQuestions(){
    return this.questionsList$;
  }
}
