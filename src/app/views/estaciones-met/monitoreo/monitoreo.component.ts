import { Component, OnInit, ViewChild  } from '@angular/core';

import { ChartType,RadialChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {  } from 'chart.js';

import { cdn } from '../../../_nav';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss']
})
export class MonitoreoComponent implements OnInit {

  cdn: any;
  /***************************************** */
  // Doughnut
  public doughnutChartLabels: Label[] = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  public doughnutChartData: MultiDataSet = [
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
    [65, 59, 90, 81, 56, 55, 40, 200],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  /***************************************** */
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 50, 51, 56, 55, 40], label: 'Series A' }
  ];
  public lineChartLabels: Label[] = ['27/07/2019 2:00:36', '27/07/2019 2:01:36', '27/07/2019 2:02:36', '27/07/2019 2:03:36', '27/07/2019 2:04:36', '27/07/2019 2:05:36', '27/07/2019 2:06:36'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { 
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(0, 255, 0, 0.3)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  /***************************************** */
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40, 200], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';
  /***************************************** */
  constructor() {
    this.cdn = cdn;
  }

  ngOnInit() {
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  /***************************************** */
  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push('27/07/2019 2:0'+(this.lineChartData[0].data.length)+':36');
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }

}
