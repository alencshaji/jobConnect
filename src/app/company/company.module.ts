import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { MaterialModule } from '../material/material.module';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    CompanyHomeComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CompanyModule { }
