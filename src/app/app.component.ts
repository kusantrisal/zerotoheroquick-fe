import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SetMember, PatchMember } from './shared/store/member/member.actions';
import { SocketService } from './shared/socket/socket.service';
import { AuthService } from './shared/auth/auth/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zerotoherquick-fe';

  @Select() member$
  //@Select(state => state.app) app$

  constructor(
    private store: Store,
    public authService: AuthService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.socketService.connect();
    }
  }

  dispatchSetMember() {
    this.store.dispatch([new SetMember({ firstName: 'Kush', lastname: 'Risal' })]);
  }

  dispatchPatchMember() {
    this.store.dispatch([new PatchMember({ firstName: 'Fish', lastname: 'King' })]);
  }
}
