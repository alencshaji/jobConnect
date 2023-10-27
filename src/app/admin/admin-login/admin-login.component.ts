import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service/data-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  adminForm = this.fb.group({
    auname: ['', [Validators.required]],
    apsw: ['', [Validators.required]],
  });

  constructor(private route: Router, private db: DataServiceService, private fb: FormBuilder) { }

  loginAdmin() {
    var uname = this.adminForm.value.auname;
    var psw = this.adminForm.value.apsw;
    if (this.adminForm.valid) {
      this.db.adminLogin(uname, psw).subscribe({
        next: (result: any) => {
          alert(result.message);
          this.route.navigateByUrl("/admin/admin-home");
        },
        error: (result: any) => {
          alert(result.error.message);
        }
      });
    } else {
      alert("Invalid login form");
    }
  }
}
