import { Component } from '@angular/core';
import { Admin } from '../../models/admin';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss']
})
export class ListAdminsComponent {
  @Input() dataSource: Admin[] = []
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'password', 'options'];
}
