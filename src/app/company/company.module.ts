import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { MaterialModule } from '../material/material.module';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyViewApplicantsComponent } from './company-view-applicants/company-view-applicants.component';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    CompanyHomeComponent,
    CompanyViewApplicantsComponent,
    SearchPipe

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CompanyModule { }
