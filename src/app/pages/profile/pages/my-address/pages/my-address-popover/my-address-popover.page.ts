import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';

@Component({
  selector: 'app-my-address-popover',
  templateUrl: './my-address-popover.page.html',
  styleUrls: ['./my-address-popover.page.scss'],
})
export class MyAddressPopoverPage implements OnInit {
  @Input() address: CustomerAddressSchema;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  /**
   * @description Dismiss
   */
  async DismissClick(event) {
    await this.popoverController.dismiss({
      event,
      address: this.address
    });
  }
}
