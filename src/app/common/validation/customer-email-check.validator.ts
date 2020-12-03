import { CustomerEmailCheckService } from './service/customer-email-check.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerEmailCheckModel } from './model/customer-email-check.model';

export function CustomerEmailCheck(
  emailCheck: CustomerEmailCheckService,
  type: string = 'register'
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ):
    | Observable<{ [key: string]: any } | null>
    | Promise<{ [key: string]: any } | null> => {
    if (control.value && control.value.indexOf('@') !== -1) {
      // tslint:disable-next-line:no-shadowed-variable
      const promise = new Promise<any>((resolve, reject) => {
        emailCheck
          .existEmail({ email: control.value.trim() })
          .subscribe(
            (response: CustomerEmailCheckModel) => {
              if (response.success && response.data === 1) {
                (type === 'register') ? resolve({ emailExists: true }) : resolve(null);
              } else {
                (type === 'register') ? resolve(null) : resolve({ emailNotExists: true });
              }
            },
            (error) => {
              (type === 'register') ? resolve({ emailExists: true }) : resolve({ emailNotExists: true });
            }
          );
      });
      return promise;
    } else {
      return null;
    }
  };
}
