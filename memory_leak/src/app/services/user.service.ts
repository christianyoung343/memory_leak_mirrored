import { Injectable, InjectionToken, NgModule } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { doc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Question } from 'src/models/question';
import { User } from '../../models/user';

@Injectable()
export class UserService {

    user$: Observable<User | null | undefined>
    public displayName: string;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
        this.displayName = "";
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) { return this.afs.doc<User>('users/' + user.uid).valueChanges() }
                else { return of(null) }
            })
        )
    }

    refreshUser(userObj: any) {
        let userRef: AngularFirestoreDocument<User> = this.afs.collection('users').doc<User>(userObj.uid)
        return userRef.set({
            uid: userObj.uid,
            email: userObj.email,
            displayName: userObj.displayName
        },
            { merge: true })
    }
    async googleSignIn() {
        let gap = new firebase.auth.GoogleAuthProvider()
        let cred = await this.afAuth.signInWithPopup(gap)
        return this.refreshUser(cred.user)
    }
    async signOut() {
        await this.afAuth.signOut()
        this.router.navigate(['/'])
    }

    getUser() {
        return this.user$
    }

    async getNameById(userID: string): Promise<string> {
        let val: string
        val = await this.afs.collection<User>('users').doc(userID).ref.get().then(doc => {
            let data = doc.data()
            if (data) {
                return data.displayName
            } else {
                return "User Not Found"
            }
        }).catch(() => {
            return "User Not Found"
        })
        return val;

    }
}
