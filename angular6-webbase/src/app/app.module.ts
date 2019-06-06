import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import {
  Header01Component,
  Footer01Component,
} from './core/layout/index';

@NgModule({
  declarations: [
    AppComponent,
    Header01Component,
    Footer01Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
