import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    SignUpParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
