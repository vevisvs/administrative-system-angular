import { Component, OnInit, Pipe } from '@angular/core';
import { Admin, DialogData } from './models/admin';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdminService } from 'src/app/core/services/admin.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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

  public role: string;
  admins$!: Observable<Admin[]>;

  constructor(public dialog: MatDialog, private adminService: AdminService, private as: AuthService){
    this.role = this.as.getUserType();
  }

  ngOnInit():void{
    this.admins$ = this.adminService.getAdmins();
  }

  add(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { data: this.dataAdmin },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const adminAdded = {
          ...result,
          role: 'Administrador'
        };
        console.log("Nuevo administrador:", adminAdded);
        this.adminService.addAdmin(adminAdded).then(() => {
          this.admins$ = this.adminService.getAdmins();
        });
      }
    });
  }

  delete(adminId: string): void{
    this.adminService.deleteAdmin(adminId)
  }

  edit(admin: Admin): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { ...admin },
    });
    dialogRef.afterClosed().subscribe({
      next: (adminModificated) => {
        if (adminModificated) {
          this.adminService.findAdmin(adminModificated).subscribe((doc) => {
            if (doc) {
              this.adminService.editAdmin(adminModificated, doc.id);
            }
          });
        }
      },
    });
  }
}
