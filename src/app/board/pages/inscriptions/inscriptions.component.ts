import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { Inscription } from './models/inscription';
import { Observable } from 'rxjs';
import { inscriptionsData } from './store/inscriptions.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {

  inscriptions$: Observable<Inscription[]>

  constructor(private store: Store){
    this.store.dispatch(InscriptionsActions.loadInscriptions()),
    this.inscriptions$ = this.store.select(inscriptionsData);
  }

  displayedColumns= ['id', 'user', 'course']
}
