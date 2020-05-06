import { Component, OnInit } from '@angular/core';
import { Select,Store } from '@ngxs/store';
import { SetMember } from 'src/app/shared/store/member/member.actions';
import { PatchFriend } from 'src/app/shared/store/friend/friend.actions';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Select() member$
  @Select() friends$
  constructor(private store: Store) { }

  ngOnInit() {
  }

  dispatchSetMember() {
    this.store.dispatch([new SetMember({ firstName: 'From', lastname: 'Profile' })]);
    this.store.dispatch([new PatchFriend({ firstName: 'From', lastname: 'Profile' })]);
  }

}
