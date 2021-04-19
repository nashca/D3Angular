import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as d3 from "d3";

class SvgObject {
    svg: any;
    g: any;
    x: any;
    y: any;
    height: any;
    width: any;
    margin: any
    line: any;
    area: any;
}

@Component({
  selector: 'barchart',
  templateUrl: './comp.barchart.html'
})
export class BarChart implements OnInit, OnChanges {
    @Input() data: any;
    //@Input() data: { value: number, date: string }[];

    //width = 700;
    //height = 700;
    //margin = 50;

    //svg: any;
    //svgInner: any;
    //yScale: any;
    //xScale: any;
    //xAxis: any;
    //yAxis: any;
    //lineGroup: any;


  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);


    constructor(public chartElem: ElementRef) {}

    ngOnInit() {

this.data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
    this.createSvg();
    this.drawBars(this.data);

//    this.data: = [
//    {date: new Date('2010-01-01'), value: 40},
//    {date: new Date('2010-01-04'), value: 93},
//    {date: new Date('2010-01-05'), value: 95},
//    {date: new Date('2010-01-06'), value: 130},
//    {date: new Date('2010-01-07'), value: 110},
//    {date: new Date('2010-01-08'), value: 120},
//    {date: new Date('2010-01-09'), value: 129},
//    {date: new Date('2010-01-10'), value: 107},
//    {date: new Date('2010-01-11'), value: 140},
//  ];

    }

    ngOnChanges(changes: SimpleChanges): void {
    }

private createSvg(): void {
    this.svg = d3.select("#barchart")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map((d: any) => d.Framework))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.Framework))
    .attr("y", (d: any) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.Stars))
    .attr("fill", "#d04a35");
}




}
