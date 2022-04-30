import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat'

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
import { QuestionComponent } from './containers/question/question/question.component';
import { AnswerParentComponent } from './containers/answer/answer-parent/answer-parent.component';
import { CommentComponent } from './containers/comment/comment/comment.component';
import { IndividualCommentComponent } from './individual-comment/individual-comment.component';
import { IndividualAnswerComponent } from './individual-answer/individual-answer.component';

import { environment } from '../environments/environment';
import { UserService } from './services/user.service';
import { AuthenticateService } from './services/authenticate.service';

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
		QuestionComponent,
		AnswerParentComponent,
		CommentComponent,
		IndividualCommentComponent,
		IndividualAnswerComponent
	],
	
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],

	providers: [AngularFirestore, UserService, AuthenticateService],
	bootstrap: [AppComponent]
})
export class AppModule { }
