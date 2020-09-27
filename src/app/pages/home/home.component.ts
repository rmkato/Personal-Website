import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projectBarVisible: boolean;

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
    window.addEventListener('scroll', this.checkPosition);
    this.projectBarVisible = false;
  }

  ngOnInit() {
    this.checkPosition();
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
  }

  projectControlSelector(id) {
    this.scrollProjectIntoView(id);
    this.setActiveProject('projectControl-'+id);
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
