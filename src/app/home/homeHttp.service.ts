import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeHttpService {

  MAESTRO_BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  searchUserByNameLike(userName) {
    return this.http.get(this.MAESTRO_BASE_URL + '/member/searchUserByNameLike/' + userName, { withCredentials: false, responseType: 'json' });
  }

  sendFriendRequest(memberUuid) {
    const header = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');
    console.log(memberUuid)
    return this.http.get(this.MAESTRO_BASE_URL + '/member/sendFriendRequest/' + memberUuid, { headers: header , withCredentials: true, responseType: 'json' });
  }
}
