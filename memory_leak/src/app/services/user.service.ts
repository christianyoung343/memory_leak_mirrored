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

    async getUserDisplayNameById(userID: string): Promise<string> {
        let name: string ="";
        await this.afs.collection<User>('users').valueChanges().subscribe(u => {
            for(let i = 0; i< u.length;i++){
                console.log("Display Name: " + u[i].displayName);
                if(u[i].uid === userID){
                   this.displayName = u[i].displayName;
                   console.log(this.displayName);
                   name = this.displayName;
                }
            }
            console.log(name);
            return name;
        });
        
        console.log(name);
        return name;
        
    }
}
