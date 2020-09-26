import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('100ms', style({opacity: 0}))
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
