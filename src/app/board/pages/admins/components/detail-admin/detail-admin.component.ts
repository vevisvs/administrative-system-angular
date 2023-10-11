import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.scss']
})
export class DetailAdminComponent {
  constructor(private route: Router, private adminService: AdminService, private activatedRoute: ActivatedRoute){}

  admin: Admin | undefined;

  goBack(): void{
    this.route.navigate(['board', 'admins'])
  }

  ngOnInit(): void {
    let dataIdRoute = this.activatedRoute.snapshot.paramMap.get('id');
    if(dataIdRoute){
      this.adminService.getAdminById(dataIdRoute).subscribe({
        next:(result) => this.admin = result
      })
    } else{
      this.route.navigate(['board', 'admins'])
    }
  }
}
