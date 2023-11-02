import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {
  cname: any = ''
  cid: any = ''
  msg:any=''
  pdata: any = []
  adata: any = []
  ngOnInit(): void {
    this.cname = localStorage.getItem("company")
    this.cid = localStorage.getItem("cid")
    this.allJObs()
    this.scrollToTop()
  }
  constructor(private fb: FormBuilder, private route: Router, private db: DataServiceService) { }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  allJObs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        this.adata = result.message
        this.pdata = this.adata.filter((job: any) => job.cid === this.cid)
        console.log(this.pdata);
        if(this.pdata.length === 0){
          this.msg = '"No Jobs Posted"'
        }
      },
      error: (result: any) => {
        alert(result)
      }
    })
  }

  addPost() {
    this.route.navigateByUrl("/company/add-job")
  }
  deletePost(jId: any) {

    const confirmed = confirm("Are you sure you want to delete this Post?")
    if(confirmed){
      this.db.deleteJob(jId).subscribe({
        next:(result:any)=>{
          alert("Removed Job Posted")
          this.allJObs()
        }
      })
    }
    
  }
}
