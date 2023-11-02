import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-user',
  templateUrl: './login-signup-user.component.html',
  styleUrls: ['./login-signup-user.component.css']
})
export class LoginSignupUserComponent {

  userLoginF = this.fb.group({
    email: ['', [Validators.required]],
    psw: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,private route:Router, private db: DataServiceService) { }

  toggleForm() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.toggle('active');
    }
  }

  userLog() {
    if(this.userLoginF.valid){
      this.db.userLogin(this.userLoginF.value.email,this.userLoginF.value.psw).subscribe({
        next:(result:any)=>{
          alert(result.message)
      
          
          localStorage.setItem("user",result._id)
          localStorage.setItem("cat",result.category)
          localStorage.setItem("fname",result.fname)
          this.route.navigateByUrl("/user")
        },
        error:(result:any)=>{
          alert(result.error.message)
        }
      })
    }else{
      alert("Invalid Form")
    }
  }


}
