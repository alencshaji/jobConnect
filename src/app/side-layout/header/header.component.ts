import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appliedData: any = []
  uid:any=''
  ngOnInit(): void {
    
  }
  constructor(private db:DataServiceService){}
  appiedJobs() {
    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      this.db.appliedJob(this.uid).subscribe({
        next: (result: any) => {
          this.appliedData = result.message
        },
        error: (result: any) => {
          alert(result)
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
}
