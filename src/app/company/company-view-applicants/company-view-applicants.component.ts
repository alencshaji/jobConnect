import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-company-view-applicants',
  templateUrl: './company-view-applicants.component.html',
  styleUrls: ['./company-view-applicants.component.css']
})
export class CompanyViewApplicantsComponent implements OnInit {
  cname: any = ''
  pdata: any = []
  adata: any = []
  cid: any = ''
  msg: any = ''
  status: any = 'Confirmed'
  job:any=[]
  creationDate:String='';

  constructor(private db: DataServiceService,private route:Router) { }
  ngOnInit(): void {
    this.cname = localStorage.getItem("company")
    console.log(this.cname);
    this.cid = localStorage.getItem("cid")
    console.log(this.cid);
    this.allJObs()
  }

  allJObs() {
    if (localStorage.getItem("cid")) {
      this.db.viewApplicants(this.cid).subscribe({
        next: (result: any) => {
          this.adata = result.message;
          this.adata.forEach((applicant: any) => {
            const createdAt = new Date(applicant.createdAt);
            applicant.creationDate = formatDistanceToNow(createdAt, { addSuffix: true });
          });
  
          console.log(this.adata); // Check if applicants with creationDate are available
  
          this.pdata = this.adata.filter((applicant: any) => applicant.cid === this.cid);
  
          if (this.pdata.length === 0) {
            this.msg = 'No Applicants';
          }
        },
        error: (result: any) => {
          alert(result);
        }
      });
    }
  }
  
  confirmed(uid: any, jid: any) {
    const body = {
      status: 'Confirmed'
    }
    this.db.statusChanger(this.cid, uid, jid, body).subscribe({
      next: (result: any) => {
        result.status = this.status
        this.showConfirmedlert()
        this.allJObs()
      }
    })
  }
  rejected(uid: any, jid: any) {
    const body = {
      status: 'Rejected'
    }
    this.db.statusChanger(this.cid, uid, jid, body).subscribe({
      next: (result: any) => {
        result.status = this.status
        this.showRjectedAlert()
        this.allJObs()
      }
    })
  }
 viewPdf(path: any) {
  console.log(path);

  this.db.view(path).subscribe({
    next: (result: any) => {
      // Assuming the response is binary data, create a Blob object
      const blob = new Blob([result], { type: 'application/pdf' });
      // Create a URL for the blob data
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url);

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    },
    error: (error: any) => {
      console.error(error);
      alert('Error occurred while fetching the PDF.');
    }
  });
}

  showConfirmedlert() {
    Swal.fire({
      title: "Confirmed",
      icon: "info",
      confirmButtonText: "Close"
    });
  }
  showRjectedAlert() {
    Swal.fire({
      title: "Rejeceted",
      icon: "warning",
      confirmButtonText: "Close"
    });
  }
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/company/login-signup")
  }

  

}
