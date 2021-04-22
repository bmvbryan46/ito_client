import { Component, OnInit } from '@angular/core';
import { MedidoresService } from '../../../app_core/services/medidores-service/medidores.service';
import { MensajeService } from '../../../app_core/services/app-admin/mensaje/mensaje.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { element } from 'protractor';

@Component({
  selector: 'app-listado-medidores',
  templateUrl: './listado-medidores.component.html',
  styleUrls: ['./listado-medidores.component.scss']
})
export class ListadoMedidoresComponent implements OnInit {

  carousel: any;

  elements: any;

  latitude = 1.231617;
  longitude = -77.293553;
  latitude2 = 1.213620;
  longitude2 = -77.291173;
  mapType = 'satellite';

  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing:'0.5px',
    text: 'Sede Torobajo'
  }
  labelOptions2 = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing:'0.5px',
    text: 'Sede Vipri'
  }
  iconUrl=
  {
    url:"../../../../assets/images/localizacion.png",
    scaledSize: {
        width: 50,
        height: 70
    },
    labelOrigin: { x: 16, y: -8 },
}
  constructor(
    private router: Router,
    private medidoresService: MedidoresService,
    private mensajeService: MensajeService) {
    this.carousel = {
      title: "Medidores",
      numVisible: "4",
      btnM: "Monitoreo",
      btnH: "Historicos"
    }
  }

  async ngOnInit() {

    let medidores = await this.medidoresService.obtenerListaMedidores().subscribe(
      data => {
        this.elements = data;
        this.elements.forEach(element => {
          element.labelOptions = {
            color: 'black',
            fontFamily: '',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing:'0.5px',
            text: element.nombre,
          }
          element.iconUrl={
            url: "../../../../assets/images/medidor_map3.png",
            scaledSize: {
                width: 35,
                height: 35
            },
            labelOrigin: { x: 16, y: -8 },
        }
        });
        console.log(data);
      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });
  }

  onMouseOver(infoWindow, gm,m) {

    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;
    m.animation = 'BOUNCE';
    infoWindow.open();
}
onMouseOut(m) {
  m.animation = null;
}
  goToMonitoring(med) {
    let link =["/home/med/monitoreo/"+med.id_dispositivo_medida];
    this.router.navigate(link);
  }

  goToHistorics(med) {
    let link =["/home/med/historico/"+med.id_dispositivo_medida];
    this.router.navigate(link);
  }




}
