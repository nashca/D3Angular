import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SvgObject } from "./app.service";
import * as d3 from "d3";

@Component({
  selector: 'linechart',
  templateUrl: './comp.linechart.html'
})
export class LineChart implements OnInit, OnChanges {
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
        let height = 400;

        this.obj = new SvgObject();
        this.obj.margin = { top: 50, right: 50, bottom: 50, left: 50 };
        this.obj.svg = d3.select("#linechart").append("svg").attr("width", width).attr("height", height);
        this.obj.g = this.obj.svg.append("g").attr("transform", "translate(" + this.obj.margin.left + ", " + this.obj.margin.top + ")");

        this.obj.width = this.obj.svg.attr("width") - this.obj.margin.left - this.obj.margin.right;
        this.obj.height = this.obj.svg.attr("height") - this.obj.margin.top - this.obj.margin.bottom;
    }

    Render(data: any[]): void {
        let obj = this.obj;

        // set x-axis and y-axis scale
        obj.x = d3.scaleTime().range([0, obj.width]);
        //obj.x = d3.scaleLinear().range([0, obj.width]);  // default scale
        obj.y = d3.scaleLinear().range([obj.height, 0]); // default scale
        obj.x.domain(d3.extent(data, function(d: any) { return d.date; }));
        obj.y.domain([d3.min(data, function(d: any) { return d.value; }) / 1.005, d3.max(data, function(d: any) { return d.value; }) * 1.005]);

        // add x-axis and y-axis lines
        obj.g.append("g").attr("class", "axis axis--x").call(d3.axisBottom(obj.x)).attr("transform", "translate(0," + obj.height + ")");
        obj.g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(obj.y).tickFormat(function(d: any) { return new String((parseInt(d) / 1000)) + "k"; }));  // values left of line

        // add line
        obj.line = d3.line().x(function(d: any) { return obj.x(d.date); }).y(function(d: any) { return obj.y(d.value); });
        obj.g.append("path").datum(data).attr("class", "line").attr("d", obj.line);

        // add area
        obj.area = d3.area().x(function(d: any) { return obj.x(d.date); }).y0(obj.height).y1(function(d: any) { return obj.y(d.value); });
        obj.g.append("path").datum(data).attr("class", "area").attr("d", obj.area);

        // add dots
        obj.g.selectAll("dots")
              .data(data)
              .enter()
              .append("circle")
              .attr("class", "dot")
              .attr("cx", function(d: any) { return obj.x(d.date) })
              .attr("cy", function(d: any) { return obj.y(d.value) })
              .attr("r", 6);
    }
}
