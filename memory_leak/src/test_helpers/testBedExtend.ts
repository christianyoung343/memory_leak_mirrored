import { TestBed } from "@angular/core/testing";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { QuestionComponent } from "src/app/containers/question/question/question.component";
import { CommentComponent } from "src/app/containers/comment/comment/comment.component";
import { FooterComponent } from "src/app/footer/footer/footer.component";
import { HeaderComponent } from "src/app/header/header/header.component";
import { UserService } from "src/app/services/user.service";
import { BlankComponent } from "./blankComponent";
import { HttpClient, HttpHandler } from '@angular/common/http'
import FireauthMock from "./fireauthMock";
import FirestoreMock from "./firestoreMock";

export default class TestBedExtended extends TestBed {
    static preConfigure() {
        TestBed.configureTestingModule({
            imports: [
              RouterTestingModule.withRoutes(
                [{path: '', component: BlankComponent}]
              ),
              FormsModule,
              ReactiveFormsModule,
              BrowserModule
            ],
            providers: [
              UserService,
              HeaderComponent,
              FooterComponent,
              QuestionComponent,
              CommentComponent,
              HttpClient,
              HttpHandler,
              { provide: AngularFireAuth, useClass: FireauthMock },
              { provide: AngularFirestore, useClass: FirestoreMock }
            ]
          });
    }
}