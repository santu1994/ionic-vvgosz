import { CommonService } from 'src/app/common/services/common.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CustomerSchema } from '../model/customer.model';

const TOKEN_KEY = 'bidzone-token';
const CUSTOMER_KEY = 'bidzone-customer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  loginInfo: BehaviorSubject<CustomerSchema> = new BehaviorSubject<CustomerSchema>(
    null
  );
  token = '';

  constructor(private storage: Storage, private commonService: CommonService) {
    this.loadToken();
  }
  /**
   * @description Token Value
   */
  async loadToken() {
    const token = await this.storage.get(TOKEN_KEY);
    if (token) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  /**
   * @description Logout
   */
  async logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.loginInfo.next(null);
    await this.storage.remove(CUSTOMER_KEY);
    return await this.storage.remove(TOKEN_KEY);
  }
}
