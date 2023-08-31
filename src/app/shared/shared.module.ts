import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FulldataPipe } from './pipes/fulldata.pipe';
import { FontsizeDirective } from './directives/fontsize.directive';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FulldataPipe,
    FontsizeDirective,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    FulldataPipe,
    FontsizeDirective,
    MatNativeDateModule,
    MatDatepickerModule,
    DateFormatPipe,
    MatChipsModule,
    MatSelectModule,

  ]
})
export class SharedModule { }
