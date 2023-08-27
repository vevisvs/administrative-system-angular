import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  showFiller = false;

  constructor(private router: Router, private authService: AuthService){}

  userLoggedName: string | undefined;

  logout(): void{
    localStorage.removeItem('token')
    this.router.navigate(['authentication', 'login'])
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getUserDataFromLocalStorage();
    }

    this.authService.authAdmin$.subscribe(user => {
      if (user) {
        this.userLoggedName = `${user.name} ${user.lastname}`;
      } else {
        this.userLoggedName = undefined;
      }
    });
  }

}
