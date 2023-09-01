import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  sesionForm: FormGroup;
  invalidCredentials = false;

  constructor(private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private fb:FormBuilder){
    this.sesionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userType: ['', Validators.required]
    })
  }

  get email() {
    return this.sesionForm.get('email');
  }

  get emailInvalid() {
    return this.email?.invalid;
  }

  get emailTouched() {
    return this.email?.touched;
  }

  get emailErrors() {
    return this.email?.errors;
  }

  get password() {
    return this.sesionForm.get('password');
  }

  get passwordInvalid() {
    return this.password?.invalid;
  }

  get passwordDirty() {
    return this.password?.dirty;
  }

  get passwordTouched() {
    return this.password?.touched;
  }

  get passwordErrors() {
    return this.password?.errors;
  }

  isInvalidCredentials(): boolean {
    return this.authService.isInvalidCredentials();
  }

  login() {
    if(this.sesionForm.valid){
        const payload = {
        email: this.sesionForm.value.email,
        password: this.sesionForm.value.password,
      };
      this.authService.loginAdmin(payload, this.sesionForm.value.userType);
    } else{
      this.sesionForm.markAllAsTouched();
      this.cdr.detectChanges();
    }
  }
}


