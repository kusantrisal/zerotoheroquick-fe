import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { SocketService } from '../shared/socket/socket.service';
import { Router } from '@angular/router';
import { HttpService } from '../shared/auth/http/http.service';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth/auth/auth.service';
import { HomeHttpService } from './homeHttp.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  loginForm = this.fb.group({
    username: ['kush', Validators.required],
    password: ['pass'],
    grantType: ['password']
  });

  searchForm = this.fb.group({
    search: ['', Validators.required]
  });

  searchResult: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authHttp: HttpService,
    private http: HomeHttpService,
    public authService: AuthService,
    private socketService: SocketService) { }

  ngOnInit(): void {
  }

  sendFriendRequest(memberUuid) {
    this.http.sendFriendRequest(memberUuid).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  search() {
    console.log(this.searchForm.value);
    this.http.searchUserByNameLike(this.searchForm.value.search).subscribe(

      res => {
        console.log(res);

        this.searchResult = res;

      },
      err => console.log(err)
    );
  }

  signIn() {
    this.authHttp.signIn(this.loginForm).subscribe(
      res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('expires', res.expires);
        this.socketService.connect();
        this.router.navigate(['/profile']);
      },
      err => throwError(err)
    )
  }
}
