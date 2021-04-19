import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SvgObject } from "./app.service";
import * as d3 from "d3";

@Component({
  selector: 'slider',
  templateUrl: './comp.slider.html'
})
export class Slider {
    @Input() data: any[] = [];
    obj: SvgObject;

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty("data") && this.data) {
            this.Init();
            this.Render(this.data);
            window.addEventListener("resize", () => this.Render(this.data));
        }
    }

    Init(): void {
        let width = 700;
        let height = 200;

        this.obj = new SvgObject();
        this.obj.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.obj.svg = d3.select("#slider").append("svg").attr("width", width).attr("height", height);
        this.obj.g = this.obj.svg.append("g").attr("transform", "translate(" + this.obj.margin.left + ", " + this.obj.margin.top + ")");

        this.obj.width = this.obj.svg.attr("width") - this.obj.margin.left - this.obj.margin.right;
        this.obj.height = this.obj.svg.attr("height") - this.obj.margin.top - this.obj.margin.bottom;
    }

    Render(data: any[]): void {
        let obj = this.obj;

    }
}
