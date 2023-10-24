import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { SingleViewComponent } from './user/single-view/single-view.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyHomeComponent } from './company/company-home/company-home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { MoreListComponent } from './user/more-list/more-list.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminUserMngComponent } from './admin/admin-user-mng/admin-user-mng.component';
import { AdminCompMngComponent } from './admin/admin-comp-mng/admin-comp-mng.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {path:'user',component:UserComponent,children:[
    { path: '', redirectTo: 'user-home', pathMatch: 'full' },
    {path:'user-home',component:UserHomeComponent},
    {path:'single-view',component:SingleViewComponent},
    {path:'more-list',component:MoreListComponent}
  ]},
  {path:"company",component:CompanyComponent,children:[
    { path: '', redirectTo: 'company-home', pathMatch: 'full' },
    {path:'company-home',component:CompanyHomeComponent},
    {path:'add-job',component:CompanyAddComponent},
    {path:'edit-job',component:CompanyEditComponent},
   
  ]},
  {path:"admin",component:AdminComponent,children:[
    {path:'',redirectTo:"admin-login",pathMatch:'full'},
    {path:'admin-home',component:AdminHomeComponent},
    {path:'admin-login',component:AdminLoginComponent},
    {path:'admin-user',component:AdminUserMngComponent},
    {path:'admin-company',component:AdminCompMngComponent}
  ]}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
