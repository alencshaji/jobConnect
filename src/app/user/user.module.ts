import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import {MaterialModule} from '../material/material.module';
import { MoreListComponent } from './more-list/more-list.component'
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { HeaderSearchPipe } from './pipes/header-search.pipe';
import { StateSearchPipe } from './pipes/state-search.pipe';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserComponent,
    MoreListComponent,
    SavedJobComponent,
    HeaderSearchPipe,
    StateSearchPipe,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PaginatorModule,
    FormsModule
  ]
})
export class UserModule { }
