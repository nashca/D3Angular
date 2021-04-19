import { Injectable } from "@angular/core";

export class SvgObject {
    svg: any;
    g: any;
    x: any;
    y: any;
    height: any;
    width: any;
    margin: any;
    line: any;
    area: any;
}

@Injectable({ providedIn: "root" })
export class DataService {
    public GetChartData(): any {
        let data = [
            { date: "2001", value: 771900 },
            { date: "2002", value: 771800 },
            { date: "2003", value: 771700 },
            { date: "2004", value: 771600 },
            { date: "2005", value: 771900 },
            { date: "2006", value: 771500 },
            { date: "2007", value: 770500 },
            { date: "2008", value: 770400 },
            { date: "2009", value: 771000 },
            { date: "2010", value: 772400 },
            { date: "2011", value: 774100 },
            { date: "2012", value: 776700 },
            { date: "2013", value: 777100 },
            { date: "2014", value: 779200 },
            { date: "2015", value: 782300 },
            { date: "2016", value: 782300 },
            { date: "2017", value: 782300 },
            { date: "2018", value: 782000 },
            { date: "2019", value: 782100 },
            { date: "2020", value: 771900 }
        ];
        return data;
    }
}