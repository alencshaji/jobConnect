import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, formatDistanceToNow } from 'date-fns';
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
  msg:any=''
  searchString: any = ""
  searchStateString:any=''
  searchState:any=''
  searchData: string = '';
  filteredProducts: any = [];
  selectedCategory: string = 'All';
  job:any=[]

  ngOnInit(): void {
    this.scrollToTop()
    this.allJobs()
    this.db.search.subscribe((data: any) => {
      this.searchString = data
    })
    this.db.searchState.subscribe((udata: any) => {
      this.searchStateString = udata
    })
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  accessData(event: any) {
    this.searchData = event.target.value;
    this.db.search.next(this.searchData);
  }
  accessStateData(event: any) {
    this.searchState = event.target.value;
    this.db.searchState.next(this.searchState);
  }
  




  constructor(private route: Router, private db: DataServiceService) { }
  allJobs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        this.pdata = result.message
        this.pdata.forEach((job:any)=>{
          job.createdAt = new Date(job.createdAt);
          job.createdDate = formatDistanceToNow(job.createdAt,{addSuffix:true})
        })
        this.pdata.sort((a:any,b:any)=>b.createdAt - a.createdAt)


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
          if(this.appliedData.length === 0){
            this.msg = '"No Applied Jobs"'
          }
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
  categoryJob(selectedCategory:string) {
    this.selectedCategory = selectedCategory
     if (selectedCategory === 'All') {
       this.filteredProducts = this.pdata;
     } else {
       this.filteredProducts = this.pdata.filter((item: any) => item.jobtype === selectedCategory);
     }
   } 
   

}
