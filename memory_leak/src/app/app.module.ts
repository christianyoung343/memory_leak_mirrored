import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { AdminParentComponent } from './containers/admin/admin-parent/admin-parent.component';
import { HomeParentComponent } from './containers/home/home-parent/home-parent.component';
import { ProfileParentComponent } from './containers/profile/profile-parent/profile-parent.component';
import { QuestionCreationParentComponent } from './containers/question-creation/question-creation-parent/question-creation-parent.component';
import { QuestionViewParentComponent } from './containers/question-view/question-view-parent/question-view-parent.component';
import { SearchResultsParentComponent } from './containers/search-results/search-results-parent/search-results-parent.component';
import { SignUpParentComponent } from './containers/sign-up/sign-up-parent/sign-up-parent.component';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QuestionCreationService } from './services/question-creation.service';
import { UserService } from './services/user.service';
import { User } from 'src/models/user';
import { AuthenticateService } from './services/authenticate.service';
// { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { QuestionComponent } from './containers/question/question/question.component';
import { AnswerParentComponent } from './containers/answer/answer-parent/answer-parent.component';
import { CommentComponent } from './containers/comment/comment/comment.component';
import { IndividualCommentComponent } from './individual-comment/individual-comment.component';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXwvR6Ax0ntJ7maFfqKVrjI28MYzaHjsQ",
  authDomain: "memory-leak-spring2022.firebaseapp.com",
  projectId: "memory-leak-spring2022",
  storageBucket: "memory-leak-spring2022.appspot.com",
  messagingSenderId: "800244229837",
  appId: "1:800244229837:web:60c44fbdf6686cf53e6b84",
  measurementId: "G-X5RNZS658W"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminParentComponent,
    HomeParentComponent,
    ProfileParentComponent,
    QuestionCreationParentComponent,
    QuestionViewParentComponent,
    SearchResultsParentComponent,
    SignUpParentComponent,
    QuestionComponent,
    AnswerParentComponent,
    CommentComponent,
    IndividualCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  //  provideFirebaseApp(() => initializeApp(environment.firebase)),
  //  provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore()),
  ],
  providers: [AngularFirestore, UserService, AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
