import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  selectedCategory: any = ''
  selectedType: any = ''
  selectedExp: any = ''
  selectedCountry: any = '';
  selectedState: any = ''
  cid: any = ''
  companyname: any = ''
 
  jobForm = this.fb.group({
    jobTitle: ['', [Validators.required]],
    expirence: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    country: ['', [Validators.required]],
    jobType: ['', [Validators.required]],
    category: ['', [Validators.required]],
    jobRole: ['', [Validators.required]],
    state: ['', [Validators.required]]

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
  



  constructor(private fb: FormBuilder, private db: DataServiceService, private route: Router) { }
  ngOnInit(): void {
    this.companyname = localStorage.getItem("company")
  }
  companyid = localStorage.getItem("cid")

 
  addJob() {
    if (this.jobForm.valid) {
      const path = this.jobForm.value
      const body = {
        title: path.jobTitle,
        category: path.category,
        role: path.jobRole,
        location: path.country,
        salary: path.salary,
        state: path.state,
        jobtype: path.jobType,
        expirence: path.expirence,
        cid: this.companyid,
        cname: this.companyname

      }
      console.log(body);

      this.db.jobPost(body).subscribe({
        next: (result: any) => {
          alert("Job added")
          this.jobForm.reset()
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
          console.log('Error Response Body:', error.error);
          alert('An error occurred while adding the job.');
        }

      })
    } else {
      alert("Invalid Form")
    }



  }


  updateSelectedCategory() {
    const categoryValue = this.jobForm.get('category')?.value;
    this.selectedCategory = categoryValue;
  }
  updateSelectedType() {
    const JtypeValue = this.jobForm.get('jobtype')?.value;
    this.selectedType = JtypeValue;
  }
  updateSelectedexpirence() {
    const expValue = this.jobForm.get('experience')?.value;
    this.selectedExp = expValue;
  }
  updateCountry() {
    const couValue = this.jobForm.get('country')?.value;
    this.selectedCountry = couValue;
  }
  updateState() {
    const couValue = this.jobForm.get('state')?.value;
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
  

  logout() {
    localStorage.clear()
    this.route.navigateByUrl("/company/login-signup")
  }
}
