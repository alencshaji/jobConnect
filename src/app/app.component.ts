import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jobportal';
  showFooter: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = event.url.includes('/user/signup') || event.url.includes('/user/login')||event.url.includes('company/login-signup') || event.url.includes('/admin')
        ||event.url.includes('/company');
      }
    });
  }
}
