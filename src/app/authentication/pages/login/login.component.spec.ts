import { TestBed } from "@angular/core/testing"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { LoginComponent } from "./login.component"
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('Test del "LoginComponent"', () => {

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
  });

  it('El componente debe existir', () => {
    const instance = TestBed.createComponent(LoginComponent);
    const app = instance.componentInstance
    expect(app).toBeTruthy();
  })

  it('Si todos los campos no están llenos, el form debe retornar como inválido', () => {
    const instance = TestBed.createComponent(LoginComponent);
    const app = instance.componentInstance
    instance.detectChanges()
    const form = app.sesionForm;
    const email = app.sesionForm.controls['email']
    email.setValue('ve@example.com')
    expect(form.invalid).toBeTruthy();
  })

  it('Si todos los campos están llenos, el form debe retornar como válido', () => {
    const instance = TestBed.createComponent(LoginComponent);
    const app = instance.componentInstance
    instance.detectChanges()
    const form = app.sesionForm;
    const email = app.sesionForm.controls['email']
    const password = app.sesionForm.controls['password']
    email.setValue('ve@example.com')
    password.setValue('123456789')
    expect(form.valid).toBeTruthy();
  })

  it('El email debe tener un formato válido, de lo contrario se genera el error en el campo', () => {
    const instance = TestBed.createComponent(LoginComponent);
    const component = instance.componentInstance
    const email = component.sesionForm.controls['email']
    email.setValue('asdfasdf')
    instance.detectChanges()
    expect(email.hasError('email')).toBe(true);
  });


  it('Cuando el form sea válido y se envíe, se deben limpiar los inputs del form', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    app.sesionForm.controls['email'].setValue('ve@example.com');
    app.sesionForm.controls['password'].setValue('123456789');
    app.goIn();
    expect(app.sesionForm.controls['email'].value).toBe(null);
    expect(app.sesionForm.controls['password'].value).toBe(null);
  });


})
