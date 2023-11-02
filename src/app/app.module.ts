import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './side-layout/header/header.component';
import { FooterComponent } from './side-layout/footer/footer.component';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { AdminModule } from './admin/admin.module';
import { CompanyModule } from './company/company.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupCompComponent } from './login-signup-comp/login-signup-comp.component';
import { LoginSignupUserComponent } from './login-signup-user/login-signup-user.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { PaginatorModule } from 'primeng/paginator';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeadSearchPipe } from './pipes/search-head/head-search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginSignupCompComponent,
    LoginSignupUserComponent,
    SignupUserComponent,
    LandingPageComponent,
    HeadSearchPipe,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AdminModule,
    CompanyModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
