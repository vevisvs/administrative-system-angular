import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';


@NgModule({
  declarations: [
    InscriptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InscriptionsRoutingModule
  ]
})
export class InscriptionsModule { }
