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
  cname:any=''
  cid: any = ''
  pdata: any = []
  adata: any = []
  ngOnInit(): void {
    this.cname=localStorage.getItem("company")
    this.cid = localStorage.getItem("cid")
    this.allJObs()
  }
  constructor(private fb: FormBuilder, private route: Router, private db: DataServiceService) { }

  allJObs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        this.adata = result.message
        this.pdata = this.adata.filter((job: any) => job.cid === this.cid)


        console.log(this.pdata);

      },
      error: (result: any) => {
        alert(result)
      }
    })
  }

  addPost() {

    this.route.navigateByUrl("/company/add-job")
  }
}
