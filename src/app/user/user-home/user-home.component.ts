import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  pdata: any = []
  uid: any = []
  singleView: any = []
  savedData: any = []
  sData:any=[]
  starClr:any

  ngOnInit(): void {
    this.allJobs()
    this.savedJobLists()
    this.scrollToTop()
  }

  constructor(private route: Router, private db: DataServiceService, private ar: ActivatedRoute) { }
  allJobs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        this.pdata = result.message

      },
      error: (result: any) => {
        alert(result)
      }
    })
  }
  applyLink(cid: any, jid: any) {

    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      const body = {
        cid,
        jid,
        uid: this.uid
      }

      this.db.applyJob(body).subscribe({
        next: (res: any) => {
          if (res.status === false) {
            this.showAppliedAlert(res.message)
          } else {
            this.showSuccessAlert(res.message)
          }
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    } else {
      this.showLoginAlert()
    }
  }
  savedJobs(jid: any) {
    this.starClr=false;
    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      this.db.savedJobs(this.uid,jid).subscribe({
        next: (result: any) => {
          this.savedData = result.message
          alert(result.message)
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    }
  }
  showLoginAlert() {
    Swal.fire({
      title: "Please Login !",
      icon: "warning",
      confirmButtonText: "Close"
    });
  }
  showSuccessAlert(d: any) {
    Swal.fire({
      title: d,
      icon: "success",
      confirmButtonText: "Close"
    });
  }
  showAppliedAlert(d: any) {
    Swal.fire({
      title: d,
      icon: "info",
      confirmButtonText: "Close"
    });
  }
  view(id: any) {
    this.db.getOneJob(id).subscribe({
      next: (result: any) => {
        this.singleView = result.message

      }, error: (result: any) => {
        alert(result)
      }
    })
  }
  // toggleStarClicked(jobId: string) {
  //   this.starClicked[jobId] = !this.starClicked[jobId];
  // }
  savedJobLists() {
    this.uid = localStorage.getItem("user")
    this.db.savedJobList(this.uid).subscribe({
      next: (result: any) => {
        this.sData = result.message
        if(this.sData._id){
          this.starClr = true
        }else{
          this.starClr = false
        }
      },
      error: (result: any) => {
        alert(result.message)
      }
    })

  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
