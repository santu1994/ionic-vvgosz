import { Injectable, NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private zone: NgZone
  ) { }

  success(messages, action, durationTime, internet): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.toastController
        .create({
          message: messages,
          duration: durationTime,
          buttons: [
            {
              side: 'start',
              icon: internet ? 'wifi-outline' : 'checkmark-circle-outline'
            },
            {
              side: 'end',
              icon: action ? 'close-outline' : '',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ],
          position: 'bottom',
          animated: true,
          keyboardClose: true,
          color: 'success'
        })
        .then(toastData => {
          toastData.present();
        });
    });
  }

  showSuccess(
    messages: string,
    action: string = '',
    durationTime: number = 2000,
    internet: boolean = false
  ) {
    this.toastController
      .dismiss()
      .then(obj => { })
      .catch(() => { })
      .finally(() => {
        this.success(messages, action, durationTime, internet);
      });
  }

  showError(messages: string, action: string = 'X', durationTime: number = 0, internet: boolean = false) {
    this.toastController
      .dismiss()
      .then(obj => { })
      .catch(() => { })
      .finally(() => {
        this.error(messages, action, durationTime, internet);
      });
  }

  error(messages, action, durationTime, internet): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      this.toastController
        .create({
          message: messages,
          duration: durationTime,
          buttons: [
            {
              side: 'start',
              icon: internet ? 'globe-outline' : 'information-circle-outline',
            },
            {
              side: 'end',
              icon: action ? 'close-outline' : '',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ],
          position: 'bottom',
          animated: true,
          keyboardClose: true,
          color: 'danger'
        })
        .then(toastData => {
          toastData.present();
        });
    });
  }

  // Show Loader
  async showLoader(msg = '') {
    this.zone.run(async () => {
      const loading = await this.loadingController.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    });
  }

  // Hide Loader
  async hideLoader() {
    return await this.loadingController.dismiss();
  }
}
