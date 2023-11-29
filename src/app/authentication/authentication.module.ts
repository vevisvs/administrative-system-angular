import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
