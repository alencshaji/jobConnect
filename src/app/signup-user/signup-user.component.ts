import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})

export class SignupUserComponent {
  selectedGender: any = '';
  selectedCategory: any = '';
  selectedFileName: string = '';
  selectedCountry: any = '';
  selectedState: any = ''
  signUpForm = this.fb.group({
    fname: ["", [Validators.required]],
    lname: ["", [Validators.required]],
    email: ["", [Validators.required]],
    uname: ["", [Validators.required]],
    resume: [null as File | null],
    country: ["", [Validators.required]],
    state: ["", [Validators.required]],
    dob: ["", [Validators.required]],
    gender: ["", [Validators.required]],
    cod: ["", [Validators.required]],
    ph: ["", [Validators.required]],
    psw: ["", [Validators.required]],
    category: ["", [Validators.required]],

  })
  indianStates: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];
  usStates: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
    // Add more U.S. states here
  ];

  constructor(private fb: FormBuilder, private db: DataServiceService,private route:Router) { }


  uploadResume(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.signUpForm.patchValue({ resume: file });
      this.selectedFileName = file.name;
    }
  }




  userSignup() {
    if (this.signUpForm.valid) {
      const formData = new FormData();
      const file = this.signUpForm.get('resume')?.value as File;
  
      formData.append('fname', this.signUpForm.get('fname')?.value?.toString() || '');
      formData.append('lname', this.signUpForm.get('lname')?.value?.toString() || '');
      formData.append('username', this.signUpForm.get('uname')?.value?.toString() || '');
      formData.append('email', this.signUpForm.get('email')?.value?.toString() || '');
      formData.append('psw', this.signUpForm.get('psw')?.value?.toString() || '');
      formData.append('country', this.signUpForm.get('country')?.value?.toString() || '');
      formData.append('category', this.signUpForm.get('category')?.value?.toString() || '');
      formData.append('state', this.signUpForm.get('state')?.value?.toString() || '');
      formData.append('dob', this.signUpForm.get('dob')?.value?.toString() || '');
      formData.append('gender', this.signUpForm.get('gender')?.value?.toString() || '');
      formData.append('cod', this.signUpForm.get('cod')?.value?.toString() || '');
      formData.append('ph', this.signUpForm.get('ph')?.value?.toString() || '');
      if (file) {
        formData.append('resume', file);
        console.log(file);
        
      }
  
      console.log(formData);
  
      this.db.userRegister(formData).subscribe({
        next: (result: any) => {
          alert('Registered Successfully');
          this.signUpForm.reset();
          this.route.navigateByUrl('/user/login')
        },
        error: (result: any) => {
          alert(result.error.message);
        }
      });
    } else {
      alert('All fields are required');
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
  updateCountry() {
    const couValue = this.signUpForm.get('country')?.value;
    this.selectedCountry = couValue;
  }
  updateState() {
    const couValue = this.signUpForm.get('state')?.value;
    this.selectedState = couValue;
  }

  generateStateList(): string[] {
    switch (this.selectedCountry) {
      case 'India':
        return this.indianStates;
      case 'United States':
        return this.usStates;
      default:
        return [];
    }
  }
}




// onFileSelect(event: Event) {
//   const inputElement = event.target as HTMLInputElement;
//   if (inputElement && inputElement.files && inputElement.files.length > 0) {
//     const file = inputElement.files[0];
//     const allowedTypes = ['application/pdf'];
//     if (file && allowedTypes.includes(file.type)) {
//       // this.signUpForm.patchValue({ resume: file });
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       console.log(file);
//     } else {
//       alert('PDF files only are allowed!!');
//     }
//   }
// }