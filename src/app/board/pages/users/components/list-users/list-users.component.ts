import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Users } from '../../models/users';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  public role: string;

  constructor(private as: AuthService){
    this.role = this.as.getUserType();
  }

  @Input() dataSource: Users[] = [];
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() goDetails = new EventEmitter();

  displayedColumns: string[] = ['id', 'fulldata', 'email', 'password', 'country', 'phone', 'options'];

}
