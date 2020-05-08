import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [ProfileComponent, MessageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class MemberModule { }
