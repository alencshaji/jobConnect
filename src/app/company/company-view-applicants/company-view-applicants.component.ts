import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-view-applicants',
  templateUrl: './company-view-applicants.component.html',
  styleUrls: ['./company-view-applicants.component.css']
})
export class CompanyViewApplicantsComponent implements OnInit {
  cname: any = ''
  ngOnInit(): void {
    this.cname =localStorage.getItem("company")
  }
}
