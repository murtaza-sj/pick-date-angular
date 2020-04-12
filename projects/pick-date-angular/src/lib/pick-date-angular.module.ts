import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PickDateAngularComponent } from './pick-date-angular.component';
import { PickCalendarAngularComponent } from './pick-calendar-angular/pick-calendar-angular.component';

@NgModule({
  declarations: [PickDateAngularComponent, PickCalendarAngularComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  exports: [PickDateAngularComponent, PickCalendarAngularComponent],
})
export class PickDateAngularModule {}
