import { Component } from '@angular/core';
import { Users } from '../../models/users';

const DATA: Users[] = [
  {id: 1, name: "Carolina", lastname: "Spelorzi", email: "carol@example.com", country: "Venezuela", phone: 424679876}
];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'country', 'phone'];
  dataSource = DATA;
}
