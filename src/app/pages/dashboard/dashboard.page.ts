import { Component, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { HeaderModel } from 'src/app/common/model/header.model';
import {
  AdminModel,
  CommonService,
} from 'src/app/common/services/common.service';
import { filter } from 'rxjs/operators';
import { ProductSchema } from 'src/app/common/model/product.model';
import { CustomerSocketService } from 'src/app/common/services/customer-socket.service';
import { ProductListService } from '../product-list/common/service/product-list.service';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { GetCustomerProductModel } from '../product-list/common/model/product-list.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { CommonModel } from 'src/app/common/model/common.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  /**
   * @description Header Data
   */
  headerData: HeaderModel = {
    is_bid: true,
    is_logo: true,
  };

  public customerInfo: CustomerSchema;
  adminInfo: AdminCurrencySchema;
  customerSubscription: Subscription;
  productData: Array<ProductSchema> = [];

  forkJoinSubscription: Subscription;
  newUpcomingSubscription: Subscription;

  resultsLength = 0;
  pageSize = 5;
  isLoadingResults = true;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private commonService: CommonService,
    private socketService: CustomerSocketService,
    private service: ProductListService,
    private notification: NotificationService
  ) { }

  ionViewWillEnter() {
    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
      });

    this.getProductAdmin();

    // Socket Connect
    this.socketService.socketConnect();

    // Socket Join Room
    this.socketService.joinRoom({
      type: 'all-product',
      id: 'all_product',
    });

    // New Upcoming Product
    this.newUpcomingSubscription = this.socketService
      .newUpcomingProductSocket()
      .subscribe((response: CommonModel) => {
        if (response.success) {
          this.getProduct(0);
        }
      });
  }

  ionViewWillLeave() {
    this.customerSubscription.unsubscribe();
    this.socketService.socketDisconnect();
    this.newUpcomingSubscription.unsubscribe();
    this.forkJoinSubscription.unsubscribe();
  }

  /**
   * @description Get Product Admin
   */
  getProductAdmin() {
    const dataParameters: any = {
      pageIndex: 0,
      pageSize: this.pageSize,
      status: 'set_auction',
      is_active: true,
    };

    this.isLoadingResults = true;
    this.forkJoinSubscription = forkJoin({
      product: this.service.getProduct(dataParameters),
      admin: this.commonService.getAdmin(),
    }).subscribe(
      (res: { product: GetCustomerProductModel; admin: AdminModel }) => {
        this.isLoadingResults = false;
        // Admin
        if (res.admin.success) {
          this.adminInfo = res.admin.data;
        }
        // Product
        if (res.product.success) {
          this.productData = res.product.data.data;
          this.resultsLength = res.product.data.recordsTotal;
          this.productData.map((element) => {
            return (element.status = 'normal');
          });
        }
      },
      (error) => {
        this.isLoadingResults = false;
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description Get Product
   */
  getProduct(pageIndex: number = 0, event = null) {
    const dataParameters: any = {
      pageIndex,
      pageSize: this.pageSize,
      status: 'set_auction',
      is_active: true,
    };

    this.service.getProduct(dataParameters).subscribe(
      (response: GetCustomerProductModel) => {
        if (event) { event.target.complete(); }
        if (response.success) {
          const productData = response.data.data;
          productData.map((element) => {
            return (element.status = 'normal');
          });

          if (pageIndex === 0) {
            this.resultsLength = response.data.recordsTotal;
            this.productData = productData;
          } else {
            this.productData = this.productData.concat(productData);
          }
        }
      },
      (error) => {
        if (event) { event.target.complete(); }
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description Refresh Data
   */
  doRefresh(event) {
    this.getProduct(0, event);
  }

  /**
   * @description Scroll Load
   */
  loadData(event) {
    const totalPageSize = Math.ceil(this.resultsLength / this.pageSize);
    const currentPageSize = Math.ceil(this.productData.length / this.pageSize);
    if (totalPageSize > currentPageSize) {
      this.getProduct(currentPageSize, event);
    } else {
      event.target.disabled = true;
    }
  }
}
