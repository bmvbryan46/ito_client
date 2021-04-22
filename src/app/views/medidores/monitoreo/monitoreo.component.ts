import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VariablesService } from '../../../app_core/services/variables-service/variables.service';
import { MedidoresService } from '../../../app_core/services/medidores-service/medidores.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';
import { IngresoService } from '../../../app_core/services/ingreso-service/ingreso.service';
import { cdn } from '../../../_nav';

import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss']
})
export class MonitoreoComponent implements OnInit {

  med_id: any;
  med = {
    nombre: " ",
    IotMarcaDispositivoMedida: {
      IotTipoDispositivo: {
        nombre: " ",
      }
    }
  };
  data_g: any;
  cdn: any;

  grph_data: any;

  /***************************************** */
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{}]
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

  public lineChartLegend = true;
  public lineChartType = 'line';

  /***************************************** */

  constructor(
    private activatedRoute: ActivatedRoute,
    private medidoresService: MedidoresService,
    private variablesService: VariablesService,
    private ingresoService: IngresoService,
    private mensajeService: MensajeService
  ) {
    this.cdn = cdn;
    this.med_id = this.activatedRoute.snapshot.params.id_med;
    console.log(this.med_id);
  }

  async ngOnInit() {

    let ingreso = await this.ingresoService.getMessage().subscribe(
      data => {

        if (data.id_dispositivo_medida == this.med_id) {
          console.log("dattaaa", data);
          this.pushOne(data);
        }

      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
        //this.closeViewForm()
      });

    let medidor = await this.medidoresService.obtenerMedidor(this.med_id).subscribe(
      data => {
        this.med = data;
        console.log(data);
      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });

    let variables = await this.variablesService.obtenerDatosVariables(this.med_id, 10).subscribe(
      data => {
        this.data_g = data;
        this.loadData(data)
        console.log(data);
      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });
  }

  /***************************************** */


  public pushOne(dat_var: any) {

    this.grph_data.forEach(element => {
      if (element.id_var == dat_var.id_variable) {
        element.data[0].data.push(dat_var.valor);
        element.labels.push(dat_var.fecha_hora.replace("T", " ").replace("Z", " "));
      }
    });


  }

  public loadData(data_serv: any) {

    this.grph_data = new Array<any>();

    data_serv.forEach(element => {

      let aleat1 = Math.random() * 255;
      let aleat2 = Math.random() * 255;
      let aleat3 = Math.random() * 255;

      let lineChartColors: Color[] = [
        {
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(' + aleat1 + ', ' + aleat2 + ', ' + aleat3 + ', 0.3)',
          pointBackgroundColor: 'rgba(' + aleat1 + ', ' + aleat2 + ', ' + aleat3 + ', 0.3)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];

      let  data_aux = new Array<any>();
      let lineChartData: ChartDataSets[] = [{ data: new Array<any>(), label: element.unidad }];
      let lineChartLabels: Label[] = [];

      element.IotDatoMedicions.forEach(e_data => {
        data_aux.push(e_data.valor);
        lineChartLabels.push(e_data.fecha_hora.replace("T", " ").replace("Z", " "));
      });

      lineChartData[0].data = data_aux;

      let obj = {
        id_var: element.id_variable,
        title: element.nombre,
        colors: lineChartColors,
        data: lineChartData,
        labels: lineChartLabels
      }

      this.grph_data.push(obj);

    });




  }


}
