import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  showFiller = false;

  constructor(private router: Router){}

  logout(): void{
    localStorage.removeItem('token')
    this.router.navigate(['authentication', 'login'])
  }
}
