import { Component } from '@angular/core';
import { Admin } from './models/admin';

const ELEMENT_DATA: Admin[] = [
  {id: 1, name: 'Mia', lastname: "Canal", email: "mia@example.com", password: "1234567"},
];

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {

  dataSource = ELEMENT_DATA;
}
