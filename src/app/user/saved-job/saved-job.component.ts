import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-saved-job',
  templateUrl: './saved-job.component.html',
  styleUrls: ['./saved-job.component.css']
})
export class SavedJobComponent implements OnInit {
  uid: any = ''
  sData: any = []
  singleView: any = []
  msge:any='"No Saved Job Found"'
  ngOnInit(): void {
    this.savedJobLists()
  }

  constructor(private db: DataServiceService) { }

  savedJobLists() {
    this.uid = localStorage.getItem("user")
    this.db.savedJobList(this.uid).subscribe({
      next: (result: any) => {
        this.sData = result.message
        console.log("sdata",this.sData);
        
      },
      error: (result: any) => {
        alert(result.message)
      },
    })

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
  deleteJobSaved(id:any) {
    const confirmed = confirm("Are you sure you want to delete this Post?")
    if(confirmed){
      this.db.deleteSavedJob(id).subscribe({
        next:(result:any)=>{
          this.savedJobLists()
        }
      })
    }
    
  }
  deleteSaved() {
    this.uid=localStorage.getItem("user")
    const confirmed = confirm("Are you sure you want to clear saved jobs?")
    if(confirmed){
      this.db.deleteSavedAllJob(this.uid).subscribe({
        next:(result:any)=>{
          this.savedJobLists()
          
        }
      })
    }
    
  }

}
