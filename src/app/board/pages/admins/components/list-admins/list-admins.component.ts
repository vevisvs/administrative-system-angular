import { Component } from '@angular/core';
import { Admin } from '../../models/admin';
import { Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss']
})
export class ListAdminsComponent {

  public roleUser: string = "";

  constructor(private authService: AuthService){
    this.roleUser = this.authService.getUserType();
  }

  @Input() dataSource: Admin[] = []
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'password', 'options'];
}
