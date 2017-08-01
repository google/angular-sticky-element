import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import {StickyElementModule} from 'angular-sticky-element';

@NgModule({
  imports:      [ BrowserModule, StickyElementModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
