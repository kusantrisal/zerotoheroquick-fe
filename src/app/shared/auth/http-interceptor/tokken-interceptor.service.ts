import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor,HttpErrorResponse, HttpRequest, HttpHandler  } from '@angular/common/http';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private injector: Injector) { }

  intercept(req, next) {
    
    if (!req.withCredentials) {
      return next.handle(req);
    }

    let authService = this.injector.get(AuthService);

    let tokenziedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + `${authService.getToken()}`
      }
    });
    return next.handle(tokenziedReq) .pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error.message);
      }
      ));
  }

    //the magic of refreshing token.
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

      let httpService = this.injector.get(HttpService);

      console.log('Refreshing token')
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
  
        return httpService.refreshToken().pipe(
          switchMap((res: any) => {
            this.isRefreshing = false;
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);
            localStorage.setItem('expires', res.expires);


            this.refreshTokenSubject.next(res.access_token);
            return next.handle(this.addToken(request, res.access_token));
          }));
  
      } else {
        return this.refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(jwt => {
            return next.handle(this.addToken(request, jwt));
          }));
      }
    }
  
    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  
}
