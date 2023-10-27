import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service/data-service.service';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})

export class SignupUserComponent {
  selectedGender: any = '';
  selectedCategory: any = '';
  selectedCountry:any='';

  signUpForm = this.fb.group({
    fname: ["", [Validators.required]],
    lname: ["", [Validators.required]],
    email: ["", [Validators.required]],
    uname: ["", [Validators.required]],
    country: ["", [Validators.required]],
    state: ["", [Validators.required]],
    dob: ["", [Validators.required]],
    gender: ["", [Validators.required]],
    cod: ["", [Validators.required]],
    ph: ["", [Validators.required]],
    psw: ["", [Validators.required]],
    category: ["", [Validators.required]]
  })


  constructor(private fb: FormBuilder, private db: DataServiceService) { }
  userSignup() {
    if (this.signUpForm.valid) {
      
      
      this.db.userRegister(
        this.signUpForm.value.fname, this.signUpForm.value.lname, this.signUpForm.value.uname,
        this.signUpForm.value.email, this.signUpForm.value.psw, this.signUpForm.value.country, this.signUpForm.value.category,
        this.signUpForm.value.state, this.signUpForm.value.dob, this.signUpForm.value.gender,
        this.signUpForm.value.cod, this.signUpForm.value.ph
      ).subscribe({
        next: (result: any) => {
          alert("Registered Succesfully");
          this.signUpForm.reset();
        },
        error: (result: any) => {
          alert(result.message);
        }
      })
    } else {
      alert("invalid data")
    }


  }



  updateSelectedGender() {
    const genderValue = this.signUpForm.get('gender')?.value;
    this.selectedGender = genderValue;
  }
  updateSelectedCategory() {
    const categoryValue = this.signUpForm.get('category')?.value;
    this.selectedCategory = categoryValue;
  }
  updateCountry(){
    const  couValue= this.signUpForm.get('country')?.value;
    this.selectedCountry =couValue;
  }
}
