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
  selectedCountry: any = ''
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
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/company/login-signup")
  }
}
