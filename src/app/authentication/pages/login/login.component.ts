import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  sesionForm: FormGroup;

  constructor(private authService: AuthService, private fb:FormBuilder){
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


  // goIn(): void{
  //   if (this.sesionForm.invalid) {
  //     this.sesionForm.markAllAsTouched();
  //   } else {
  //     this.authService.loginAdmin(this.sesionForm.getRawValue())
  //     this.sesionForm.reset();
  //   }
  // }
  login() {
    if(this.sesionForm.valid){
        const payload = {
        email: this.sesionForm.value.email,
        password: this.sesionForm.value.password,
      };
      this.authService.loginAdmin(payload, this.sesionForm.value.userType);
      console.log("login:", payload, this.sesionForm.value.userType)
    } else{
      this.sesionForm.markAllAsTouched();
      console.log("Hubo un error al intentar iniciar sesión")
    }
  }
}
