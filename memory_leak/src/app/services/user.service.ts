import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../../models/user';

@Injectable()
export class UserService {

	user$: Observable<User | null | undefined>
	displayName: string;

	constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private router: Router) {
		this.displayName = "";

		this.user$ = this.angularFireAuth.authState.pipe(
			switchMap(user => {
				if (user) { return this.angularFirestore.doc<User>('users/' + user.uid).valueChanges() }
				else { return of(null) }
			})
		);
	}

	refreshUser(userObj: any) {
		if (userObj) {
			let userRef: AngularFirestoreDocument<User> = this.angularFirestore.collection('users').doc<User>(userObj.uid);

			return userRef.set({
				uid: userObj.uid,
				email: userObj.email,
				displayName: userObj.displayName
			},
				{ merge: true });
		}
		else {
			return;
		}
	}

	async googleSignIn() {
		let gap = new firebase.auth.GoogleAuthProvider();
		let cred = await this.angularFireAuth.signInWithPopup(gap);

		return this.refreshUser(cred.user);
	}

	async signOut() {
		await this.angularFireAuth.signOut();
		this.router.navigate(['/']);
	}

	getUser() {
		return this.user$;
	}

	getUsers() {
		return this.angularFirestore.collection<User>('users').valueChanges();
	}

	removeQuestionFromUser(questionID: string) {
		let userList$: Observable<User[]> = this.angularFirestore.collection<User>('users').valueChanges();

		userList$.subscribe(users => {
			users.forEach(user => {
				if (user.askedQuestionIDs) {
					for (let id of user.askedQuestionIDs) {
						if (id === questionID) {
							let idArray = user.askedQuestionIDs;
							let idIndex = idArray.indexOf(questionID, 0);

							if (idIndex >= 0) {
								idArray.splice(idIndex, 1);
							}

							let userRef: AngularFirestoreDocument<User> = this.angularFirestore.collection('users').doc<User>(user.uid);

							userRef.update({
								askedQuestionIDs: idArray
							});
						}
					}
				}
			});
		});
	}

	async getNameById(userID: string): Promise<string> {
		let val: string;
		val = await this.angularFirestore.collection<User>('users').doc(userID).ref.get().then(doc => {
			let data = doc.data();

			if (data) {
				return data.displayName;
			}
			else {
				return "User Not Found";
			}
		}).catch(() => {
			return "Error: User Not Found";
		});

		return val;

	}
}
