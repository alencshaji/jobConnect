import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-more-list',
  templateUrl: './more-list.component.html',
  styleUrls: ['./more-list.component.css']
})
export class MoreListComponent implements OnInit {
  pdata: any = []
  uid: any = []
  singleView: any = []
  appliedData:any=[]
  savedData: any = []
  starClr: boolean =false;
  ngOnInit(): void {
    this.scrollToTop()
    this.allJobs()
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }




  constructor(private route: Router, private db: DataServiceService) { }
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

  view(id: any) {
    this.db.getOneJob(id).subscribe({
      next: (result: any) => {
        this.singleView = result.message

      }, error: (result: any) => {
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
  appiedJobs() {
    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      this.db.appliedJob(this.uid).subscribe({
        next: (result: any) => {
          this.appliedData = result.message
          console.log(this.appliedData);
          
        },
        error:(result:any)=>{
        alert(result)
        }
      })
    } else {
      this.showLoginAlert()
    }
  }
  savedJobs(jid: any) {
    
    if (localStorage.getItem("user")) {
       
      this.uid = localStorage.getItem("user")
      this.db.savedJobs(this.uid, jid).subscribe({
        next: (result: any) => {
          this.savedData = result.message  
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    }
  }
  goToSaved(){
    this.route.navigateByUrl("/user/saved-job")
  }
  // toggleStarClicked() {
  //   this.starClr = !this.starClr;
  // }
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
  showLoginAlert() {
    Swal.fire({
      title: "Please Login !",
      icon: "warning",
      confirmButtonText: "Close"
    });
  }

}
