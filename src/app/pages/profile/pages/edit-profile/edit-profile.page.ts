import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import * as env from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ProfileService } from '../../common/service/profile.service';
import { GetCustomerModel } from '../../common/model/profile.model';
import * as _ from 'lodash';
import { CommonService } from 'src/app/common/services/common.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from '@ionic-native/camera/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { MatDatepicker } from '@angular/material/datepicker';
import { RealFileLoaderService } from 'src/app/common/services/real-file-loader.service';

const CUSTOMER_KEY = 'bidzone-customer';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  @ViewChild('picker', { static: true })
  private picker: MatDatepicker<Date>;
  public customerInfo: CustomerSchema;
  baseUrl = env.environment.baseUrl + 'uploads/images/customer';
  public personalInfoForm: FormGroup;
  files: File = null;
  maxDate: Date;
  previewImage: string;

  personalInfoValidationMessages = {
    name: [
      {
        required: 'Name is required',
      },
      { minlength: 'Minimum name length is 3 characters' },
    ],
    email: [
      {
        required: 'Email is required',
      },
      { email: 'Enter valid email' },
      { minlength: 'Minimum email length is 5 characters' },
    ],
    phone: [
      {
        required: 'Phone is required',
      },
    ],
    dob: [
      {
        required: 'DOB is required',
      },
    ],
    gender: [
      {
        required: 'Gender is required',
      },
    ],
    image: [
      {
        required: 'Image is required',
      },
    ],
  };
  customerSubscription: Subscription;
  loading: boolean;

  constructor(
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private service: ProfileService,
    public fb: FormBuilder,
    private commonService: CommonService,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private crop: Crop,
    private webview: WebView,
    private realFileLoaderService: RealFileLoaderService,
    private translate: TranslateService,
    private keyboard: Keyboard,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    /**
     * @description Personal Info Form
     */
    this.personalInfoForm = this.fb.group({
      _id: ['', Validators.compose([Validators.required])],
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5),
        ]),
      ],
      ph_number: ['', Validators.compose([])],
      dob: [null, Validators.compose([])],
      image: ['', Validators.compose([])],
      current_image: ['', Validators.compose([])],
      gender: ['', Validators.compose([])],
    });

    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
        this.personalInfoForm.patchValue({
          _id: this.customerInfo._id,
          name: this.customerInfo.name,
          email: this.customerInfo.email,
          ph_number: this.customerInfo.ph_number,
          dob: this.customerInfo.dob,
          gender: this.customerInfo.gender,
          current_image: this.customerInfo.image,
        });
      });
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.picker.close();
  }

  /**
   * @description Personal Info Form Validation
   */
  personalFormValidateInput(name?: any) {
    let errorMsg: any;
    const control = this.personalInfoForm.get(name);
    if (control && control.errors) {
      // tslint:disable-next-line:forin
      for (const key in control.errors) {
        _.map(this.personalInfoValidationMessages[name], (o) => {
          if (o.hasOwnProperty(key)) {
            return (errorMsg = o[key]);
          }
        });
        return errorMsg;
      }
    }
  }

  /**
   * @description Submit Form
   * @params Personal Info Form data
   */
  async onSubmit() {
    // Not Validated
    if (this.personalInfoForm.invalid) {
      return;
    }
    // Keyboard Hide
    await this.keyboard.hide();
    let formValue = null;
    if (this.personalInfoForm.value.image) {
      const formData = new FormData();
      formData.append('_id', this.personalInfoForm.value._id);
      formData.append('name', this.personalInfoForm.value.name);
      formData.append('email', this.personalInfoForm.value.email);
      if (this.personalInfoForm.value.ph_number) {
        formData.append('ph_number', this.personalInfoForm.value.ph_number);
      }
      if (this.personalInfoForm.value.dob) {
        formData.append('dob', this.personalInfoForm.value.dob);
      }
      formData.append('gender', this.personalInfoForm.value.gender);
      formData.append(
        'current_image',
        this.personalInfoForm.value.current_image
      );
      formData.append('image', this.files, this.files.name);
      formValue = formData;
    } else {
      formValue = this.personalInfoForm.value;
    }

    this.loading = true;
    this.service.editProfile(formValue).subscribe(
      (response: GetCustomerModel) => {
        this.loading = false;
        if (response.success) {
          this.files = null;
          this.previewImage = null;
          this.personalInfoForm.patchValue({
            current_image: '',
            image: '',
          });
          this.commonService.updateCustomer(response.data);
          this.notification.showSuccess(this.translate.instant(response.msg), '', 3000);
        } else {
          this.loading = false;
          this.notification.showError(this.translate.instant(response.msg), '', 3000);
        }
      },
      (error) => {
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description Change Password Modal
   */
  async changePasswordModel() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordPage,
    });

    modal.onDidDismiss()
      .then((data) => {
        if (!data.data.dismissed) {
          setTimeout(() => {
            this.modalCtrl.dismiss({ dismissed: true });
          }, 500);
        }
      });
    return await modal.present();
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  /**
   * @description Select Image
   */
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  /**
   * @description Choose Image
   */
  takePicture(sourceTypes: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceTypes,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then(
      async (imagePath) => {
        this.cropImage(imagePath);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * @description Crop Image
   */
  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 }).then(
      (newPath) => {
        this.showCroppedImage(newPath.split('?')[0]);
      },
      (error) => {
        console.log('Error cropping image', error);
      }
    );
  }

  async showCroppedImage(ImagePath) {
    this.previewImage = this.webview.convertFileSrc(ImagePath);
    const imageFile = await this.realFileLoaderService.getSingleFile(ImagePath);
    if (imageFile) {
      this.files = imageFile;
      this.personalInfoForm.patchValue({
        image: 'yes',
      });
    }
  }

  /**
   * @description Deactivate account
   */
  async deactivateAccount() {
    const alert = await this.alertController.create({
      cssClass: 'conform-alert',
      message: 'Do you want to deactivate account?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'YES',
          cssClass: 'conform-btn',
          handler: () => {
            // this.authService
            //   .logout()
            //   .then(() => {
            //     this.router.navigate(['/login']);
            //     setTimeout(() => {
            //       this.commonService.updateCustomer(null);
            //     }, 3000);
            //   })
            //   .catch((err) => {
            //     this.notification.showError(err, 'X', 2000);
            //   });
          },
        },
      ],
    });
    await alert.present();
  }

}
