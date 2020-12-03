import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { HeaderModel } from 'src/app/common/model/header.model';
import { Storage } from '@ionic/storage';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { HeaderService } from './common/service/header.service';
import { GetCustomerModel } from '../../profile/common/model/profile.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { AdminModel, CommonService } from 'src/app/common/services/common.service';
import { filter } from 'rxjs/operators';
const CUSTOMER_KEY = 'bidzone-customer';
@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit, OnDestroy {
  @Input() headerData: HeaderModel;
  public customerInfo: CustomerSchema;
  customerSubscription: Subscription;
  forkJoinSubscription: Subscription;
  loading: boolean = true;
  constructor(
    private storage: Storage,
    private service: HeaderService,
    private notification: NotificationService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    // Storage Database
    this.storage.get(CUSTOMER_KEY).then((valueStr) => {
      const customerInfo = JSON.parse(valueStr);
      if (!this.customerInfo) {
        this.forkJoinSubscription = forkJoin({
          customer: this.service.customerProfile({ _id: customerInfo._id }),
          admin: this.commonService.getAdmin(),
        }).subscribe(
          (res: { customer: GetCustomerModel; admin: AdminModel }) => {
            this.loading = false;
            // Admin
            if (res.admin.success) {
              this.commonService.updateAdmin(res.admin.data);
            }
            // Customer
            if (res.customer.success) {
              this.commonService.updateCustomer(res.customer.data);
            }
          },
          (error) => {
            this.loading = false;
            this.notification.showError(error, '', 3000);
          }
        );
      }
    });

    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.loading = false;
        this.customerInfo = stateData;
      });
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
    if (this.forkJoinSubscription) {
      this.forkJoinSubscription.unsubscribe();
    }
  }
}
