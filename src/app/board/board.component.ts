import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

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
    const userDataJson = localStorage.getItem('userData');
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      this.userLoggedName = `${userData.name} ${userData.lastname}`;
    } else {
      this.userLoggedName = undefined;
    }
  }

}
