import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { InscriptionsComponent } from "./inscriptions.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InscriptionsComponent,
        pathMatch: 'full'
      },
  ])
  ],
  exports: [RouterModule],
})

export class InscriptionsRoutingModule {}
