import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../models/users';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-users',
  templateUrl: './detail-users.component.html',
  styleUrls: ['./detail-users.component.scss']
})
export class DetailUsersComponent {
  userDetails: Users | undefined;

  constructor(private route: Router, private rutaActiva: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void{

  }

  goBack(): void{
    this.route.navigate(['board/users']);
  }
}
