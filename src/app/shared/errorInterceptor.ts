// this is the global http interceptor that is used to handle all error
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  err_msg: any;
  err_details: any;
  constructor(
    private _router: Router,
    private router: Router,
    public toastController: ToastController
    ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
          } else {
            const active_url = this.router.url;
            switch (error.status) {
              case 0:

                break;

                case 400:
                  this.err_msg = '';
                  this.err_details = error.error.detail;
                  if (typeof error.error.detail !== 'string') {
                    if (error.error.hasOwnProperty('email')) {
                      this.err_msg = 'Email must be unique!';
                    }else if (error.error.hasOwnProperty('password')) {
                      this.err_msg = 'Password fields didn\'t match.!';
                    } else{
                      this.err_msg = 'Error occurred, try again!';
                    }
                  } else {
                    this.err_msg = error.error.detail;
                  }
                  this.presentToastWithOptions(this.err_msg);
                  break;

              case 401:
                this.err_msg = '';
                this.err_details = error.error.detail;
                if (typeof error.error.detail !== 'string') {
                  if (error.error.detail.hasOwnProperty('non_field_errors')) {
                    this.err_msg = error.error.details['non_field_errors'];
                  }
                } else {
                  this.err_msg = error.error.detail;
                }
                this.presentToastWithOptions(this.err_msg);
                break;
              case 404:

                break;

              case 403:

                break;

              case 500:

                break;
              case 405:
                break;
            }
          }
        } else {
          console.error(error.statusText);
        }
        return throwError(error);
      })
    );
  }

  async presentToastWithOptions(error_message) {
    const toast = await this.toastController.create({
      position: 'bottom',
      color: 'danger',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          text: error_message
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
