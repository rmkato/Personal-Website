import { Component, OnInit } from '@angular/core';
import * as $ from 'jQuery'; 

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    var width = $(window).width();
    if (width >= 850) {
      $('iframe').attr('height', 1120)
    } else {
      var height = width*1.33;
      $('iframe').attr('height', height);
    }
  }

}
