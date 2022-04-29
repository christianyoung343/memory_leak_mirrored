import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class QuestionCreationService {
	private questionCollection: AngularFirestoreCollection<Question>;
	private questions: Observable<Question[]>;
	private userCollection: AngularFirestoreCollection<User>;
	private emptyArray: Array<string> = [];
	public qNum: string = '';
	private user!: User | null | undefined;

	constructor(private afs: AngularFirestore, private us: UserService) {
		this.questionCollection = afs.collection<Question>('questions');
		this.questions = this.questionCollection.valueChanges();
		this.userCollection = afs.collection<User>('users');
		this.us.getUser().subscribe((user) => {
			this.user = user;
		})
	}

	addQuestion(question: Question) {
		// console.log(this.user);

		// console.log(question.uid);
		return this.questionCollection.add(question).then((s) => {
			return s.get().then((q) => {
				this.questionCollection.doc<Question>(q.id).update({
					uid: q.id
				})

				console.log('q.id: ' + q.id)

				this.emptyArray = [];
				if (this.user) {
					//this.user.toPromise<User | null | undefined>().then((u) => {
					if (this.user.askedQuestionIDs) {
						this.emptyArray = this.user.askedQuestionIDs
					}
					//})
				}
				this.qNum = q.id;
				console.log('qNum: ' + this.qNum)
				this.emptyArray.push(q.id);
				let userRef: AngularFirestoreDocument<User> = this.afs.collection('users').doc<User>(question.askerID);
				userRef.update({
					askedQuestionIDs: this.emptyArray
				})
			});
		});
		//console.log(this.qNum);
		//return this.qNum
		// this.emptyArray.push(question.uid);
	}

	getQNum() {
		return this.qNum
	}
}
