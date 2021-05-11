import { Component, ViewChild } from '@angular/core';
// import { Nav, Platform } from 'ionic-angular';
import { CategoryPage } from '../pages/category/category.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // @ViewChild(Nav) nav: Nav;

  rootPage: any = CategoryPage;
  isList: boolean = true;
  isLocation: boolean = false;
  isSelf: boolean = false;
  isNotifications: boolean = false;
  isSearch: boolean = false;
  isCamera: boolean = false;


  constructor() {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   // statusBar.styleDefault();
    //   // splashScreen.hide();
    // });
  }

  togglePage(whichPage: string): void {
    this.isList = false;
    this.isLocation = false;
    this.isSelf = false;
    this.isNotifications = false;
    this.isSearch = false;
    this.isCamera = false;

    let newTab: string = '';

    switch (whichPage) {
      case 'List':
        this.isList = true;
        newTab = 'PhotosPage';
        break;
      case 'Location':
        this.isLocation = true;
        newTab = 'LocationsPage';
        break;
      case 'Self':
        this.isSelf = true;
        newTab = 'SelfPage';
        break;
      case 'Notifications':
        this.isNotifications = true;
        newTab = 'NotificationsPage';
        break;
      case 'Search':
        this.isSearch = true;
        newTab = 'SearchPage';
        break;
      case 'Camera':
        this.isCamera = true;
        newTab = 'CameraPage';
        break;
    }

    // this.nav.setRoot(newTab);
  }
}
