import {Component} from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private _location: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });


    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/tabs/tab1')) {
        this.showExitConfirm();
        processNextHandler();
      } else {
        this._location.back();
      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
      })
    });

  }

  showExitConfirm() {
    this.alertController.create({
      message: 'Exit the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'No',
        role: 'No',
        handler: () => {
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });

  }


}
