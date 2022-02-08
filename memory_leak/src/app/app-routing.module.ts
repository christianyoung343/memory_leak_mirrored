import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminParentComponent } from './containers/admin/admin-parent/admin-parent.component';
import { HomeParentComponent } from './containers/home/home-parent/home-parent.component';
import { ProfileParentComponent } from './containers/profile/profile-parent/profile-parent.component';
import { QuestionCreationParentComponent } from './containers/question-creation/question-creation-parent/question-creation-parent.component';

const routes: Routes = [
  {path:'',redirectTo: '/', pathMatch: 'full'},
  {path:'home',component: HomeParentComponent},
  {path:'admin', component: AdminParentComponent},
  {path:'ask', component: QuestionCreationParentComponent},
  {path:'profile',component: ProfileParentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
