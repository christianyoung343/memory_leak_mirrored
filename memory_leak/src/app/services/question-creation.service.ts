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
	private emptyArray: Array<string> = [];
	
	qNum: string = '';

	private user!: User | null | undefined;

	constructor(private angularFirestore: AngularFirestore, private userService: UserService) {
		this.questionCollection = angularFirestore.collection<Question>('questions');

		this.userService.getUser().subscribe((user) => {
			this.user = user;
		});
	}

	addQuestion(question: Question) {
		return this.questionCollection.add(question).then((docRef) => {
			return docRef.get().then((docSnapshot) => {
				this.questionCollection.doc<Question>(docSnapshot.id).update({
					uid: docSnapshot.id
				});

				this.emptyArray = [];

				if (this.user) {
					if (this.user.askedQuestionIDs) {
						this.emptyArray = this.user.askedQuestionIDs;
					};
				}

				this.qNum = docSnapshot.id;

				this.emptyArray.push(docSnapshot.id);

				let userRef: AngularFirestoreDocument<User> = this.angularFirestore.collection('users').doc<User>(question.askerID);
				userRef.update({
					askedQuestionIDs: this.emptyArray
				});
			});
		});
	}

	getQNum() {
		return this.qNum;
	}
}
