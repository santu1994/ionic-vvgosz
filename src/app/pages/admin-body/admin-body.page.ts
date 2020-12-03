import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-body',
  templateUrl: './admin-body.page.html',
  styleUrls: ['./admin-body.page.scss'],
})
export class AdminBodyPage implements OnInit {

  public menuList: MenuModel[] = [
    {
      title: 'Home',
      url: 'dashboard',
      icon: 'home',
      iClass: null
    },
    {
      title: 'Auction',
      url: 'auction',
      icon: 'hammer',
      iClass: 'flip-icon'
    },
    {
      title: 'My Orders',
      url: 'order',
      icon: 'cart',
      iClass: null
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: 'person-circle',
      iClass: null
    }
  ];

  constructor() { }

  ngOnInit() { }

}

export class MenuModel {
  title: string;
  url: string;
  icon: string;
  iClass: string;
}
