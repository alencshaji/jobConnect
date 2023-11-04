import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';
@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  selectedCategory: any = ''
  selectedType: any = ''
  selectedExp: any = ''
  selectedCountry: any = ''
  jData: any = ''
  jId: any = ''
  cname: any = ''
  cid:any=''
  editForm = this.fb.group({
    jobTitle: ['', [Validators.required]],
    expirence: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    country: ['', [Validators.required]],
    jobType: ['', [Validators.required]],
    category: ['', [Validators.required]],
    jobRole: ['', [Validators.required]],
    state: ['', [Validators.required]]
  })
  ngOnInit(): void {
    this.cid=localStorage.getItem("cid")
    this.ar.params.subscribe((data: any) => {
      this.jId = data.id
    })
    this.detailsJob()
   
    this.cname =localStorage.getItem("company")
  }
  constructor(private fb: FormBuilder, private db: DataServiceService,private route:Router, private ar: ActivatedRoute) { }

  detailsJob() {
    this.db.getOneJob(this.jId).subscribe({
      next: (result: any) => {
        this.jData = result.message
      },
      error: (result: any) => {
        alert('An error occurred while edit the job.');
      }
    })
  }

  updateJob() {
this.db.editJobs(this.jId,this.jData).subscribe({
  next:(result:any)=>{
    alert("Updated")
    this.route.navigateByUrl("/company")
  }
})
  }



  updateSelectedCategory() {
    const categoryValue = this.editForm.get('category')?.value;
    this.selectedCategory = categoryValue;
  }
  updateSelectedType() {
    const JtypeValue = this.editForm.get('jobtype')?.value;
    this.selectedType = JtypeValue;
  }
  updateSelectedexpirence() {
    const expValue = this.editForm.get('experience')?.value;
    this.selectedExp = expValue;
  }
  updateCountry() {
    const couValue = this.editForm.get('country')?.value;
    this.selectedCountry = couValue;
  }
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/company/login-signup")
  }
}
