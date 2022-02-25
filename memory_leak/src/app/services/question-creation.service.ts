import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';
import { UserService } from './user.service';
import { QuestionService } from './question.service';
import { doc, FieldValue } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class QuestionCreationService {
  private questionCollection: AngularFirestoreCollection<Question>;
  private questions: Observable<Question[]>;
  private userCollection: AngularFirestoreCollection<User>;
  private emptyArray: Array<string> = [];
  public qNum: string = '';

  constructor(private afs: AngularFirestore, private us: UserService) { 
    this.questionCollection = afs.collection<Question>('questions');
    this.questions = this.questionCollection.valueChanges();
    this.userCollection = afs.collection<User>('users');
    //this.user$ = us.getUser().subscribe(u => {
      //this.user = u;
    //});
  }

  addQuestion(question: Question) {
    
    //console.log(question.uid);
    this.questionCollection.add(question).then((s) => {
      s.get().then((q) => {
        this.qNum = q.id;
        this.emptyArray.push(q.id);
        let userRef: AngularFirestoreDocument<User> = this.afs.collection('users').doc<User>(question.askerID);
        userRef.update({
          askedQuestionIDs: this.emptyArray
        })
      });
    });
    console.log(this.qNum);
    // this.emptyArray.push(question.uid);

    // 
    // //let user = this.afs.collection('users')
    // // userRef.collection('askedQuestionIDs').add
    // 
    // let userRef: AngularFirestoreDocument<User> = this.afs.collection('users').doc<User>(this.user.uid)
    //   return userRef.set({
    //     uid: userObj.uid,
    //     email: userObj.email,
    //     displayName: userObj.displayName
    //   },
    //   {merge: true})

    
  }
}

//export const QUESTION_CREATION_SERVICE = new InjectionToken<QuestionCreationService>('QuestionCreationService');
