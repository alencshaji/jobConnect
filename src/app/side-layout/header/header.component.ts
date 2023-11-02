import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  msg:any=''
  searchData: string = '';
  ngOnInit(): void {
    
  }
  constructor(private db:DataServiceService,private route : Router){}
  appiedJobs() {
    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      this.db.appliedJob(this.uid).subscribe({
        next: (result: any) => {
          this.appliedData = result.message
          if(this.appliedData.length === 0){
            this.msg = '"No Applied Jobs"'
          }
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
  goToSaved(){
    this.route.navigateByUrl("/user/saved-job")
  }
  logOut(){
    localStorage.clear()
    this.route.navigateByUrl("")
  }


  accessData(event: any) {
    this.searchData = event.target.value;
    console.log('Search Data (accessData):', this.searchData); // Add this line
    this.db.search.next(this.searchData);
    console.log('Search Data (BehaviorSubject):', this.searchData); // Add this line
  }
}
