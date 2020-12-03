import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { ProfileService } from 'src/app/pages/profile/common/service/profile.service';
import { PasswordCheckModel } from 'src/app/pages/profile/common/model/profile.model';
import { CommonService } from 'src/app/common/services/common.service';

export function CurrentCustomerPasswordCheck(
    customerChangePasswordService: ProfileService,
    commonService: CommonService
): AsyncValidatorFn {
    return (
        control: AbstractControl
    ):
        | Observable<{ [key: string]: any } | null>
        | Promise<{ [key: string]: any } | null> => {
        if (control.value) {
            // tslint:disable-next-line:no-shadowed-variable
            const promise = new Promise<any>((resolve, reject) => {
                /**
                 * @description Customer Info
                 */
                commonService.customerData.subscribe(
                    (res: CustomerSchema) => {
                        if (res) {
                            customerChangePasswordService.currentPasswordCheck({ password: control.value.trim(), _id: res._id }).subscribe(
                                (response: PasswordCheckModel) => {
                                    if (response.success) {
                                        resolve(null);
                                    } else {
                                        resolve({ customerPasswordCheck: true });
                                    }
                                },
                                (error) => {
                                    resolve({ customerPasswordCheck: true });
                                }
                            );
                        }
                    }
                );
            });
            return promise;
        } else {
            return null;
        }
    };
}

export function CurrentCustomerOtpCheck(
    otp: string
): AsyncValidatorFn {
    return (
        control: AbstractControl
    ):
        | Observable<{ [key: string]: any } | null>
        | Promise<{ [key: string]: any } | null> => {
        if (control.value) {
            // tslint:disable-next-line:no-shadowed-variable
            const promise = new Promise<any>((resolve, reject) => {
                if (control.value.toString() === otp) {
                    resolve(null);
                } else {
                    resolve({ customerOtpCheck: true });
                }
            });
            return promise;
        } else {
            return null;
        }
    };
}
