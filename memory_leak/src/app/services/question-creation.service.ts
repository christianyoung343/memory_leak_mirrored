import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Question } from 'src/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionCreationService implements OnInit {
  private questionCollection: AngularFirestoreCollection<Question>;
  private questions: Observable<Question[]>;

  constructor(private afs: AngularFirestore) { 
    this.questionCollection = afs.collection<Question>('questions');
    this.questions = this.questionCollection.valueChanges();
  }

  addQuestion(question: Question) {
    this.questionCollection.add(question);
  }

  ngOnInit(): void {

  }
}
