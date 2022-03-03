import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminParentComponent } from './containers/admin/admin-parent/admin-parent.component';
import { HomeParentComponent } from './containers/home/home-parent/home-parent.component';
import { ProfileParentComponent } from './containers/profile/profile-parent/profile-parent.component';
import { QuestionCreationParentComponent } from './containers/question-creation/question-creation-parent/question-creation-parent.component';
import { QuestionViewParentComponent } from './containers/question-view/question-view-parent/question-view-parent.component';
import { QuestionComponent } from './containers/question/question/question.component';
import { SearchResultsParentComponent } from './containers/search-results/search-results-parent/search-results-parent.component';
import { SignUpParentComponent } from './containers/sign-up/sign-up-parent/sign-up-parent.component';
import { AuthenticateService } from './services/authenticate.service'
const routes: Routes = [
 // {path:'',redirectTo: '/', pathMatch: 'full'},
  {path:'',component: HomeParentComponent},
  {path:'home',component: HomeParentComponent},
  {path:'admin', component: AdminParentComponent, canActivate:[AuthenticateService]},
  {path:'ask', component: QuestionCreationParentComponent, canActivate:[AuthenticateService]},
  {path:'search', component: SearchResultsParentComponent, canActivate:[AuthenticateService]},
  {path:'profile',component: ProfileParentComponent, canActivate:[AuthenticateService]},
//  {path:'question/:id', component: QuestionComponent},
  {path:'question/:id', component: QuestionViewParentComponent},
  {path:'**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
