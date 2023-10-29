import { Component,OnInit } from '@angular/core';
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
  singleView:any=[]
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
        console.log(this.pdata);
        
      },
      error: (result: any) => {
        alert(result)
      }
    })
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
        
      },error:(result:any)=>{
        alert(result)
      }
    })
  }
  applyLink() {

    if (localStorage.getItem("user")) {
      this.showSuccessAlert()

    }
  }
  savedJob(){
    this.route.navigateByUrl('/user/saved-job')
  }
}
