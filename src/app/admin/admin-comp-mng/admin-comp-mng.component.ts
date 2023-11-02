import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from 'src/app/data-service/data-service.service';

@Component({
  selector: 'app-admin-comp-mng',
  templateUrl: './admin-comp-mng.component.html',
  styleUrls: ['./admin-comp-mng.component.css']
})
export class AdminCompMngComponent implements OnInit {

  displayedColumns: string[] = ['cname','email', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort; //  '!' to indicate  assigned later
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private db: DataServiceService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.allComp();
  }
  allComp() {
    this.db.companyData().subscribe({
      next: (result: any) => {
        console.log(result.message);
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
  delete(cid:any){
    this.db.deleteCompany(cid).subscribe({
      next:(result:any)=>{
        alert(result.message)
        this.allComp();
      },
      error:(result:any)=>{
        alert(result.message)
      }
    })

  }
  
}
