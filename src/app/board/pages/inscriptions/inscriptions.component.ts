import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionComplete } from './models/inscription';
import { Observable } from 'rxjs';
import { selectInscriptions } from './store/inscriptions.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { InscriptionsActions } from './store/inscriptions.actions';


@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit{

  inscriptions$: Observable<InscriptionComplete[]>

  constructor(private store: Store,  public matDialog: MatDialog){
    this.inscriptions$ = this.store.select(selectInscriptions)
    console.log(this.store.select(selectInscriptions))
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadInscriptions())
  }

  displayedColumns= ['id', 'user', 'course', 'duration', 'options']

  addInscription(): void{
    this.matDialog.open(ModalDialogComponent)
  }

  deleteInscription(id: number): void{
    this.store.dispatch(InscriptionsActions.deleteInscription( {id} ));
  }

}
