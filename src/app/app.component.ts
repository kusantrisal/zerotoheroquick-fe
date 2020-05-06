import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SetMember, PatchMember } from './shared/store/member/member.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zerotoherquick-fe';

  @Select() member$
  //@Select(state => state.app) app$

  constructor(private store: Store) { }

  dispatchSetMember() {
    this.store.dispatch([new SetMember({ firstName: 'Kush', lastname: 'Risal' })]);
  }

  dispatchPatchMember() {
    this.store.dispatch([new PatchMember({ firstName: 'Fish', lastname: 'King' })]);
  }
}
