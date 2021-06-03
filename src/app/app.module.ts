import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InvestmentsPackComponent } from './invests-pack/investments-pack.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvestModalComponent } from './modal/invest-modal/invest-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsPackComponent,
    InvestModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
