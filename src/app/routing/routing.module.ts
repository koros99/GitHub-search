import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent }  from '../profile/profile.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ReposComponent } from '../repos/repos.component';

const routes: Routes = [
  {path: "profile", component: ProfileComponent},
  {path: "repos", component: ReposComponent},
  {path:"", redirectTo:"/profile",pathMatch:"full"},
  {path:"**", component:NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
