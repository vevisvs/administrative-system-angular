import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { InfoDetailComponent } from "./components/info-detail/info-detail.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent,
        pathMatch: 'full'
      },
      {
        path: 'courses/:id',
        component: InfoDetailComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class CoursesRoutingModule{}
