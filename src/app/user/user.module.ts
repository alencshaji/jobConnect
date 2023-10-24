import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { SingleViewComponent } from './single-view/single-view.component';
import {MaterialModule} from '../material/material.module';
import { MoreListComponent } from './more-list/more-list.component'

@NgModule({
  declarations: [
    UserHomeComponent,
    UserComponent,
    SingleViewComponent,
    MoreListComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class UserModule { }
