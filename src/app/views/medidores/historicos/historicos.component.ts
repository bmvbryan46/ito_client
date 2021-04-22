import { VariablesService } from './../../../app_core/services/variables-service/variables.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { cdn } from '../../../_nav';
import msj from '../../../app_core/services/app-admin/configuracion/menssages';
import { MedidoresService } from '../../../app_core/services/medidores-service/medidores.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.scss']
})
export class HistoricosComponent implements OnInit {
  cdn: any;
  msj: any;
  medidoresForm:any;
  formulario: any = {
    fec_ini:null,
    fec_fin:null
  }

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
  constructor(
    private fb: FormBuilder,
    private variablesService:VariablesService,
    private activatedRoute:ActivatedRoute,
    private mensajeService: MensajeService,
    private medidoresService: MedidoresService
    ) {
    this.msj = msj;
    this.cdn = cdn;
    this.med_id = this.activatedRoute.snapshot.params.id_med;
    console.log(this.med_id);
  }

  async ngOnInit() {
    this.medidoresForm = this.fb.group(this.formulario);
    let medidor = await this.medidoresService.obtenerMedidor(this.med_id).subscribe(
      data => {
        this.med = data;
        console.log(data);
      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });

  }
  async buscar(){
    this.medidoresForm.submited = true;
    if (this.medidoresForm.valid) {
      var fec_ini=new Date(this.medidoresForm.get('fec_ini').value);
      var fec_fin=new Date(this.medidoresForm.get('fec_fin').value);
      let variables = await this.variablesService.obtenerVariablesDatosPorMedidorFecha(this.med_id, null,fec_ini,fec_fin).subscribe(
        data => {
          this.data_g = data;
          this.loadData(data)
          console.log(data);
        },
        err => {
          console.log(err);
          this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
        });
    } else {
    }
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
