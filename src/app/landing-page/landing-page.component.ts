import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service/data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  pdata: any = []
  uid: any = []
  singleView: any = []
  savedData: any = []
  sData: any = []
  starClr: any
  searchString: any = ""
  filteredProducts: any = [];
  selectedCategory: string = 'All';

  ngOnInit(): void {
    this.allJobs()
    this.savedJobLists()
    this.scrollToTop()
    this.db.search.subscribe((data: any) => {
      this.searchString = data
    })
  }
  constructor(private route: Router, private db: DataServiceService, private ar: ActivatedRoute) { }
  allJobs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        this.pdata = result.message
        if(this.pdata){
          this.categoryJob('All');
        }
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
      this.route.navigateByUrl("/user/login")
    }
  }
  savedJobs(jid: any) {
    this.starClr = false;
    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      this.db.savedJobs(this.uid, jid).subscribe({
        next: (result: any) => {
          this.savedData = result.message
          alert(result.message)
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    } else {
      this.showLoginAlert()
      this.route.navigateByUrl("")
    }
  }
  more() {
    if (localStorage.getItem("user")) {
      this.route.navigateByUrl('/user/more-list')
    } else {
      this.showLoginAlert()
      this.route.navigateByUrl('/user/login')
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
    if (localStorage.getItem("user")) {
      this.uid = localStorage.getItem("user")
      this.db.savedJobList(this.uid).subscribe({
        next: (result: any) => {
          this.sData = result.message
        },
        error: (result: any) => {
          alert(result.message)
        }
      })
    } else {
      this.showLoginAlert()
      this.route.navigateByUrl("")
    }


  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  categoryJob(selectedCategory:string) {
   this.selectedCategory = selectedCategory

    if (selectedCategory === 'All') {
      // Show all products when "All" is selected
      this.filteredProducts = this.pdata;
      console.log(this.filteredProducts);
      
    } else {
      // Filter products by category name
      this.filteredProducts = this.pdata.filter((item: any) => item.jobtype === selectedCategory);
    }
  } 

}
