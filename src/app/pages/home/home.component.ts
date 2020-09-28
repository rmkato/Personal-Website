import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projectBarVisible: boolean;
  p1_pos: number;
  p2_pos: number;
  p3_pos: number;

  notaryWebsiteProjectImages: Array<object> = [{
    image: 'assets/NotaryWebsite.jpg',
    thumbImage: 'assets/NotaryWebsite.jpg',
    alt: 'notary-pic-1',
  }, {
    image: 'assets/NotaryWebsite2.png',
    thumbImage: 'assets/NotaryWebsite2.png',
    alt: 'notary-pic-2',
  }, {
    image: 'assets/NotaryWebsite3.png',
    thumbImage: 'assets/NotaryWebsite3.png',
    alt: 'notary-pic-3',
  }, {
    image: 'assets/NotaryWebsite4.png',
    thumbImage: 'assets/NotaryWebsite4.png',
    alt: 'notary-pic-4',
  }, {
    image: 'assets/NotaryWebsite5.png',
    thumbImage: 'assets/NotaryWebsite5.png',
    alt: 'notary-pic-5',
  }];

  dataStickersProjectImages: Array<object> = [{
    image: 'assets/DataStickers1.png',
    thumbImage: 'assets/DataStickers1.png',
    alt: 'datastickers-pic-1',
  }, {
    image: 'assets/DataStickers2.png',
    thumbImage: 'assets/DataStickers2.png',
    alt: 'datastickers-pic-2',
  }, {
    image: 'assets/DataStickers3.png',
    thumbImage: 'assets/DataStickers3.png',
    alt: 'datastickers-pic-3',
  }, {
    image: 'assets/DataStickers4.png',
    thumbImage: 'assets/DataStickers4.png',
    alt: 'datastickers-pic-4',
  }, {
    image: 'assets/DataStickers5.png',
    thumbImage: 'assets/DataStickers5.png',
    alt: 'datastickers-pic-5',
  }];

  constructor() {
    window.addEventListener('scroll', () => this.checkPosition());
    this.projectBarVisible = false;
  }

  ngOnInit() {
    this.setProjectPositions();
    this.checkPosition();
  }

  setProjectPositions() {
    this.p1_pos = document.getElementById("notaryWebsite").offsetTop;
    this.p2_pos = document.getElementById("fitnessApp").offsetTop - 100;
    this.p3_pos = document.getElementById("chessGame").offsetTop + 350;
  }

  checkPosition() {
    var elements = document.querySelectorAll('.hidden');
    for (var i=0; i < elements.length; i++) {
      if (elements[i].getBoundingClientRect().top - window.innerHeight <= 0) {
        if (elements[i].id == 'projectControlBar') {
          elements[i].classList.add('fade-in-element-fast')
        } else {
          elements[i].classList.add('fade-in-element');
        }
        elements[i].classList.remove('hidden');
      }
    }
    var projects = document.getElementById('projects');
    if (projects.getBoundingClientRect().top-150 > 0) {
      document.getElementById('projectControlBar').classList.add('hidden');
      document.getElementById('projectControlBar').classList.remove('fade-in-element-fast');
    }
    var y_pos = window.scrollY;
    if (y_pos > this.p1_pos && y_pos < this.p2_pos) {
      this.setActiveProject("projectControl-notaryWebsite");
    } else if (y_pos > this.p2_pos && y_pos < this.p3_pos) {
      this.setActiveProject("projectControl-fitnessApp");
    } else if (y_pos > this.p3_pos) {
      this.setActiveProject("projectControl-chessGame");
    }
  }

  projectControlSelector(id) {
    this.scrollProjectIntoView(id);
  }

  scrollIntoView(id) {
    document.getElementById(id).scrollIntoView();
  }

  scrollProjectIntoView(id) {
    var position = document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - 50;
    window.scrollTo({top: position})
  }

  setActiveProject(projectSelector) {
    var controlBarChildren = document.getElementById('projectControlBar').children
    for (var i=0; i < controlBarChildren.length; i++) {
      if (controlBarChildren[i].id == projectSelector) {
        controlBarChildren[i].classList.remove('inactive');
        controlBarChildren[i].classList.add('active');
      }
      else if (controlBarChildren[i].classList.contains('active')) {
        controlBarChildren[i].classList.remove('active');
        controlBarChildren[i].classList.add('inactive');
      }
    }
  }

}
