import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ngOnInit(): void {
    
  }
  toggleForm() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.toggle('active');
    }
  }
}
