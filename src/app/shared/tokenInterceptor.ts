import { AuthenticationService } from './../tab3/services/authentication.service';

import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, empty, Subject} from 'rxjs';
import {catchError, tap, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.refreshAccessToken();
        }

        return throwError(error);
      })
    );
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      );
    }
  }


  addAuthHeader(request: HttpRequest<any>) {
    const token = localStorage.getItem('access_token');
    if (request.url.includes('login') || request.url.includes('register') || request.url.includes('refresh')) {
      return request;
    }
    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders:
          {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          }
      });
    }
    return request;
  }
}
