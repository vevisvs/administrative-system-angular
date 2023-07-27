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
  userDetail: Users | undefined;

  constructor(private route: Router, private rutaActiva: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void{
    const userId = this.rutaActiva.snapshot.paramMap.get('id');
    if (userId){
      const idUser = parseInt(userId, 10);
      this.userService.getUserById(idUser).subscribe(u => {
        this.userDetail = u;
        console.log("detalle del usuario:", this.userDetail)
      })
    }
  }

  goBack(): void{
    this.route.navigate(['board/users']);
  }
}
