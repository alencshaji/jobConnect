import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-comp',
  templateUrl: './login-signup-comp.component.html',
  styleUrls: ['./login-signup-comp.component.css']
})
export class LoginSignupCompComponent {

  companyRgForm = this.fb.group({
    cname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    psw: ['', [Validators.required]]
  })
  compnayLogForm = this.fb.group({
    cmail: ['', [Validators.required]],
    cpsw: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private db: DataServiceService,private route:Router) { }


  register() {
    if(this.companyRgForm.valid){
      this.db.companyRegister(this.companyRgForm.value.cname, this.companyRgForm.value.email, this.companyRgForm.value.psw)
      .subscribe({
        next: (result: any) => {
          alert("Registred Succesfully")
          this.companyRgForm.reset()
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    }else{
      alert("Invalid Form")
    }
   
  }
  login() {
    if(this.compnayLogForm.valid){
      this.db.companyLogin(this.compnayLogForm.value.cmail, this.compnayLogForm.value.cpsw)
      .subscribe({
        next: (result: any) => {
          localStorage.setItem("company",result.cname)
          localStorage.setItem("cid",result._id)
          alert("Login Succesfully")
          this.route.navigateByUrl("/company")
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    }else{
      alert("Invalid Form")
    }
    
  }

}
