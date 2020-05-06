import { Component, OnInit } from '@angular/core';
import { HttpService } from '../auth/http/http.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'navbar-title';
  constructor(
    private http: HttpService,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit() {
  }

  signIn() {
    this.http.signIn({ value: { username: 'kush', password: 'pass', grantType: 'password' } }).subscribe(
      res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('expires', res.expires);
        this.router.navigate(['/profile']);
      },
      err => throwError(err)
    )
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires');
    //needs to be redirected somewhere other than appcomponent
    this.router.navigate(['']);
  }

  testApi() {
    this.http.testSecureApi().subscribe(
      res => {
        console.log('Token wors')
      },
      err => throwError(err)
    )
  }

  throwError(err) {
    throw new Error(err);
  }
}
