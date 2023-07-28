import { Component, OnInit, Pipe } from '@angular/core';
import { Admin, DialogData } from './models/admin';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdminService } from 'src/app/core/services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit{
  dataAdmin: DialogData = {
    name: "",
    lastname:  "",
    email:  "",
    password: ""
  }

  admins$!: Observable<Admin[]>;

  constructor(public dialog: MatDialog, private adminService: AdminService){}

  ngOnInit(): void{
    this.admins$ = this.adminService.getAdmins();
  }

  add(): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {data: this.dataAdmin},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataAdmin = result;
      this.adminService.addAdmin({
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: result.name,
        lastname: result.lastname,
        email: result.email,
        password: result.password
      })
    });
  }

  delete(adminId: number): void{
    this.adminService.deleteAdmin(adminId)
  }

  edit(admin: Admin): void{
    console.log("usuario a modificar:", admin)
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {...admin}
    });
    dialogRef.afterClosed().subscribe({
      next: (adminModificated) => {
        if(adminModificated){
          this.adminService.editAdmin(adminModificated)
          console.log("user modificado:", adminModificated)
        }
      }
    })
  }
}
