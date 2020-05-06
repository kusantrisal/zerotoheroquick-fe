import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  signIn(userData) {

    const header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret));

    const body = new HttpParams()
      .set('username', userData.value.username)
      .set('password', userData.value.password)
      .set('grant_type', userData.value.grantType);

    return this.http.post<any>(environment.AUTH_SERVER_BASE_URL + '/auth/oauth/token', body, { headers: header, withCredentials: false, responseType: 'json' });
  }

  checkToken() {
    return this.http.get(environment.AUTH_SERVER_BASE_URL + '/auth/oauth/check_token?token=' + sessionStorage.getItem('access_token'));
  }

  refreshToken() {
    console.log('Token refresh api is being called');
    const header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*');
    //  .set('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));

    const body = new HttpParams()
      .set('client_id', environment.clientId)
      .set('client_secret', environment.clientSecret)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', localStorage.getItem('refresh_token'));

    return this.http.post<any>(environment.AUTH_SERVER_BASE_URL + '/auth/oauth/token', body, { headers: header, withCredentials: true, responseType: 'json' });
  }

  testSecureApi() {
    return this.http.get(environment.AUTH_SERVER_BASE_URL + '/auth/getPrincipal', {withCredentials: true});
  }
}
