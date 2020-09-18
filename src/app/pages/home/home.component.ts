import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  notaryWebsiteProjectImages: Array<object> = [{
    image: 'assets/res/NotaryWebsite.jpg',
    thumbImage: 'assets/res/NotaryWebsite.jpg',
    alt: 'notary-pic-1',
  }, {
    image: 'assets/res/NotaryWebsite2.png',
    thumbImage: 'assets/res/NotaryWebsite2.png',
    alt: 'notary-pic-2',
  }, {
    image: 'assets/res/NotaryWebsite3.png',
    thumbImage: 'assets/res/NotaryWebsite3.png',
    alt: 'notary-pic-3',
  }, {
    image: 'assets/res/NotaryWebsite4.png',
    thumbImage: 'assets/res/NotaryWebsite4.png',
    alt: 'notary-pic-4',
  }, {
    image: 'assets/res/NotaryWebsite5.png',
    thumbImage: 'assets/res/NotaryWebsite5.png',
    alt: 'notary-pic-5',
  }];

  dataStickersProjectImages: Array<object> = [{
    image: 'assets/res/DataStickers1.png',
    thumbImage: 'assets/res/DataStickers1.png',
    alt: 'datastickers-pic-1',
  }, {
    image: 'assets/res/DataStickers2.png',
    thumbImage: 'assets/res/DataStickers2.png',
    alt: 'datastickers-pic-2',
  }, {
    image: 'assets/res/DataStickers3.png',
    thumbImage: 'assets/res/DataStickers3.png',
    alt: 'datastickers-pic-3',
  }, {
    image: 'assets/res/DataStickers4.png',
    thumbImage: 'assets/res/DataStickers4.png',
    alt: 'datastickers-pic-4',
  }, {
    image: 'assets/res/DataStickers5.png',
    thumbImage: 'assets/res/DataStickers5.png',
    alt: 'datastickers-pic-5',
  }];

  constructor() { }

  ngOnInit() {
  }

  scrollIntoView(id) {
    document.getElementById(id).scrollIntoView();
  }

}
