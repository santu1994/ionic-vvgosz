import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { CountdownConfig } from 'ngx-countdown';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { BidSchema } from 'src/app/common/model/bid.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import * as env from 'src/environments/environment';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.page.html',
  styleUrls: ['./product-slider.page.scss'],
})
export class ProductSliderPage implements OnInit {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  @Output() counterStatus: EventEmitter<string> = new EventEmitter();
  baseUrl = env.environment.baseUrl;

  sliderOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: true,
  };
  showSlides = false;


  /**
   * @description Count Down Timer
   */
  CountdownTimeUnits: Array<[string, number]> = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1], // million seconds
  ];

  moreThan24Hours: CountdownConfig = {
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return this.CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(
            new RegExp(`${name}+`, 'g'),
            (match: string) => {
              return v.toString().padStart(match.length, '0');
            }
          );
        }
        return current;
      }, formatStr);
    },
  };

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showSlides = true;
    }, 300);
  }

  /**
   * @description Counter Event
   */
  counterEvent($event) {
    // Closed
    if ($event.action === 'done') {
      setTimeout(() => {
        this.counterStatus.emit('done');
      }, 1000);
    }
  }

}
