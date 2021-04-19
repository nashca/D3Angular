import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from "./app.service";
import { LineChart } from './comp.linechart';
import { Slider } from './comp.slider';

@NgModule({
  declarations: [
    AppComponent,
    LineChart,
    Slider
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
