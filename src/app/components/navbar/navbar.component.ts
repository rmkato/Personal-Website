import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  navbarToggle: boolean;

  constructor() { 
    this.navbarToggle = false;
  }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarToggle = (this.navbarToggle) ? false : true;
  }

  scrollIntoView(id) {
    document.getElementById(id).scrollIntoView();
  }

}
