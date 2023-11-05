import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';

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
    const hasShownWelcome = localStorage.getItem('hasShownWelcome');
    if (!hasShownWelcome) {
      this.showWelcome();
      // Set the flag to indicate that showWelcome has been called
      localStorage.setItem('hasShownWelcome', 'true');
    }
  }
  
  constructor(private route: Router, private db: DataServiceService, private ar: ActivatedRoute) { }

  showWelcome() {
    if (localStorage.getItem('fname')) {
      const name = localStorage.getItem('fname');
      Swal.fire({
        title: `Welcome, ${name}`,
        icon: 'success',
        confirmButtonText: 'Close'
      });
    }
  }


  allJobs() {
    this.db.allJObs().subscribe({
      next: (result: any) => {
        const userCategory = localStorage.getItem('cat');

       
        this.pdata = result.message.sort((a: any, b: any) => {


          if (a.category === userCategory && b.category !== userCategory) {
            return -1; // job user's category at the beginning
          } else if (a.category !== userCategory && b.category === userCategory) {
            return 1; // jobs user's category after other categories
          } else {
            return 0; // Maintain the order within the same category
          }
  
        
        });
        this.categoryJob('All');
      },
      error: (result: any) => {
        alert(result);
      }
    });
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
    }


  }
  categoryJob(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
  
    if (selectedCategory === 'All') {
      // Show all products when "All" is selected
      this.filteredProducts = this.pdata;
    } else {
      // Filter products by category name
      this.filteredProducts = this.pdata.filter((item: any) => item.jobtype === selectedCategory);
    }
    // Add createdDate for each job post in the filteredProducts array
    this.filteredProducts.forEach((job: any) => {
    job.createdAt = new Date(job.createdAt);
      job.createdDate = formatDistanceToNow(job.createdAt, { addSuffix: true });
    });
    this.filteredProducts = this.filteredProducts.slice(0, 10);
  }
  sortJobs(sortBy: string) {
    if (sortBy === 'posted') {
      this.filteredProducts = this.filteredProducts.sort((a: any, b: any) => {
        return b.createdAt - a.createdAt;
      });
    }
  }
  
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  download(){
    
  }

}
