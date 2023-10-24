import { Component } from '@angular/core';

@Component({
  selector: 'app-more-list',
  templateUrl: './more-list.component.html',
  styleUrls: ['./more-list.component.css']
})
export class MoreListComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
