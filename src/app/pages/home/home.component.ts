import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  }

  ngOnInit() {
    this.checkPosition();
  }

  checkPosition() {
    var elements = document.querySelectorAll('.hidden');
    for (var i=0; i < elements.length; i++) {
      if (elements[i].getBoundingClientRect().top - window.innerHeight <= 0) {
        elements[i].classList.add('fade-in-element');
        elements[i].classList.remove('hidden');
      }
    }
  }

  scrollIntoView(id) {
    document.getElementById(id).scrollIntoView();
  }

}
