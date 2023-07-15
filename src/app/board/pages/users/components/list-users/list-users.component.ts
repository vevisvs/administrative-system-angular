import { Component, Input } from '@angular/core';
import { Users } from '../../models/users';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  @Input() dataSource: Users[] = [];

  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'country', 'phone'];

}
