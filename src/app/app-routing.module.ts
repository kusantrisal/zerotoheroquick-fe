import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './member/profile/profile.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/auth/guard/auth.guard';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
