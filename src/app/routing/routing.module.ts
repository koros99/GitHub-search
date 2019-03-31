import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
