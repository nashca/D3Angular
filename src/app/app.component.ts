import { Component, OnInit } from '@angular/core';
import { DataService, SvgObject } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    data: any[] = [];

    constructor(private svc: DataService) {}

    ngOnInit() {
        this.data = this.svc.GetChartData();
    }
}
