import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { NotificationService } from './notification.service';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkCheckService {
  previousStatus;

  constructor(
    private network: Network,
    public notification: NotificationService
  ) {
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        this.notification.showError('No Internet Connection', 'X', 0, true);
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        this.notification.showSuccess('Internet connected', '', 2000, true);
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }

  /**
   * @description Internet Check
   */
  public internetCheck() {
    // Online
    if (this.previousStatus === 0) {
      return true;
    } else {
      return false;
    }
  }
}
