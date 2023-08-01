import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  sesionForm: FormGroup;

  constructor(private route: Router, private fb:FormBuilder){
    this.sesionForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  goIn(): void{
    if(this.sesionForm.invalid){
      console.log("form invalido")
    } else {
      console.log("form valido")
      this.route.navigate(['home'])
    }
  }
}
