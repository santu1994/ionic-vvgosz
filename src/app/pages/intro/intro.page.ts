import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IntroSliderModel } from './common/model/intro.model';
export const INTRO_KEY = 'intro-seen';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild('introSlider') slides: IonSlides;

  /**
   * @description Slider Option
   */
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  sliderContent: Array<IntroSliderModel> = [
    {
      tile: 'One-click Bid',
      description: 'Online bidding, update data in real time, so you no longer miss the good things.',
      image: 'assets/images/intro-1.png'
    },
    {
      tile: 'A Hammer Sale',
      description: 'The most authoritative auction platform is fair, just and legal',
      image: 'assets/images/intro-2.png'
    },
    {
      tile: 'After-sale Warranty',
      description: 'The peace of mind after-sales service. let you bring good things home.',
      image: 'assets/images/intro-3.png'
    }
  ];

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() { }

  /**
   * @description Slider Next
   */
  swipeNext() {
    this.slides.slideNext();
  }

  /**
   * @description Go to Home
   */
  async goHome() {
    await this.storage.set(INTRO_KEY, true);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
