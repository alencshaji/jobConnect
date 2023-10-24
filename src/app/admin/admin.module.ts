import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUserMngComponent } from './admin-user-mng/admin-user-mng.component';
import { AdminCompMngComponent } from './admin-comp-mng/admin-comp-mng.component';





@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AdminUserMngComponent,
    AdminCompMngComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,

  ]
})
export class AdminModule { }
