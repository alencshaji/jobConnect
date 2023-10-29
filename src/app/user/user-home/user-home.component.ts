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
  ngOnInit(): void {
    this.allJobs()
    this.scrollToTop()
  }

  constructor(private route: Router, private db: DataServiceService, private ar: ActivatedRoute) { }
  allJobs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        this.pdata = result.message
        console.log(this.pdata);

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

      this.db.appliedJob(body).subscribe({
        next: (res: any) => {
          alert(res.message)
        },
        error: (error: any) => {
          alert(error.message)
        }
      })

      // this.showSuccessAlert()

    } else {

    }
  }

  showSuccessAlert() {
    Swal.fire({
      title: "Applied Successfully!",
      icon: "success",
      confirmButtonText: "Close"
    });
  }
  view(id: any) {
    this.db.getOneJob(id).subscribe({
      next: (result: any) => {
        this.singleView = result.message
        console.log(this.singleView);

      }, error: (result: any) => {
        alert(result)
      }
    })
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
