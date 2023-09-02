import { TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { AuthService } from "../core/services/auth.service";
import { Users } from "../board/pages/users/models/users";


describe('Test del "AuthService"', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('El service debe ser creado', () => {
    const authservice = TestBed.inject(AuthService)
    expect(authservice).toBeTruthy();
  });

  it('Debe realizar el inicio de sesión y actualizar el estado', fakeAsync(() => {
    const payload = {
      email: 've@example.com',
      password: '123456789'
    };
    const userType = 'admin';
    authService.loginAdmin(payload, userType);
    const pathUrl = `http://localhost:3000/admins?email=${payload.email}&password=${payload.password}`
    const response: Users[] = []
    const required = httpTestingController.expectOne({
      method: 'GET',
      url: pathUrl
    })
    required.flush(response);
    tick();
    authService.authAdmin$.subscribe({next: (au) => {
      if (au === null) {
        expect(au).toBeNull();
      } else {
        expect(au).not.toBeNull();
      }
    }})
  }));

})
