import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { NetworkCheckService } from '../services/networkCheck.service';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { CommonService } from '../services/common.service';

const TOKEN_KEY = 'bidzone-token';
@Injectable()
// tslint:disable-next-line: class-name
export class httpSetHeaders implements HttpInterceptor {
  constructor(
    public notification: NotificationService,
    private router: Router,
    private network: NetworkCheckService,
    private storage: Storage,
    private authService: AuthService,
    private commonService: CommonService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // convert promise to observable using 'from' operator
    return from(this.handle(request, next));
  }

  async handle(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    const customerToken: string = await this.storage.get(TOKEN_KEY);
    const loginType: string = request.headers.get('login-type');

    if (loginType === 'C' && customerToken) {
      const headers = new HttpHeaders({
        Authorization: customerToken,
        RefererUrl: this.router.routerState.snapshot.url,
      });
      request = request.clone({ headers });
    }


    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    // Network Check
    // if (!this.network.internetCheck) {
    //   this.notification.showError('No Internet Connection', 'X', 0, true);
    //   return;
    // }

    return next.handle(request).pipe(
      retry(2),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) { }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          errorMessage = error.error.msg;
          this.authService.logout().then(() => {
            this.router.navigate(['/login'], {
              queryParams: { returnUrl: error.error.data.referer },
            });
            setTimeout(() => {
              this.commonService.updateCustomer(null);
            }, 3000);
          });
        } else if (error.status === 500) {
          errorMessage = error.error.msg;
        } else if (error.status === 400) {
          errorMessage = error.error.msg;
        } else {
          errorMessage = error.statusText;
        }
        return throwError(errorMessage);
      })
    ).toPromise();
  }
}
