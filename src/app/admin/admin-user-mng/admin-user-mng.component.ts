import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from 'src/app/data-service/data-service.service';

@Component({
  selector: 'app-admin-user-mng',
  templateUrl: './admin-user-mng.component.html',
  styleUrls: ['./admin-user-mng.component.css']
})
export class AdminUserMngComponent implements OnInit {
  displayedColumns: string[] = ['fname', 'lname', 'category', 'email', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort; //  '!' to indicate  assigned later
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private db: DataServiceService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.allUsers();
  }

  allUsers() {
    this.db.userData().subscribe({
      next: (result: any) => {
        this.dataSource.data = result.message; // set data to the data source
        this.dataSource.sort = this.sort; // Set the MatSort instance
        this.dataSource.paginator = this.paginator;
      },
      error: (result) => {
        alert(result.message);
      }
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
  delete(uid:any){
    this.db.deleteUser(uid).subscribe({
      next:(result:any)=>{
        this.allUsers()
        alert(result.message)
      },
      error:(result:any)=>{
        alert(result.message)
      }
    })
  }
}

