import { MensajeService } from './../../../app_core/services/app-admin/mensaje/mensaje.service';
import { VehiculoGpsService } from './../../../app_core/services/vehiculo-gps/vehiculo-gps.service';
import { Component, OnInit } from '@angular/core';
import { cdn } from '../../../_nav';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import msj from '../../../app_core/services/app-admin/configuracion/menssages';

/* declare var ol: any; */

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss']
})
export class MonitoreoComponent implements OnInit {

  cdn: any;
  msj: any;
  vehiculosGps: any;
  vehiculoSeleccionado: any;
  vehiculosGpsForm:any;
  formulario: any = {
    id_vehiculo_gps: ''
  }
  latitude = 1.231617;
  longitude = -77.293553;
  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing:'0.5px',
    text: 'Sede Torobajo'
  }
  iconUrl={
    url:"../../../../assets/images/localizacion.png",
    scaledSize: {
        width: 50,
        height: 70
    },
    labelOrigin: { x: 16, y: -8 },
  }


  /* latitude: number = 1.2321439009463404;
  longitude: number = -77.29408890008928;

  map: any; */

  constructor(private vehiculoGpsService: VehiculoGpsService, private mensajeService: MensajeService, private fb: FormBuilder) {
    this.msj = msj;
    this.cdn = cdn;
  }

  async ngOnInit() {
    this.vehiculosGpsForm = this.fb.group(this.formulario);
    let vehiculos = await this.vehiculoGpsService.obtenerVehiculosGps().subscribe(
      data => {
        this.vehiculosGps = data;
        this.vehiculosGps.forEach(element => {
          element.modelo_gps=element.IotVehiculo.IotTipoVehiculo.nombre+" "+element.IotVehiculo.linea+" "+element.IotVehiculo.marca+" "+element.modelo_gps+" Servicio: "+element.IotVehiculo.IotTipoServicioVehiculo.nombre
        });
      },
      err => {
        console.log(err);
        this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
      });

    this.vehiculosGpsForm.controls['id_vehiculo_gps'].valueChanges.subscribe(async value=>{
      console.log("Aquiiii",value);
      if(value){
      let ubicaciones = await this.vehiculoGpsService.obtenerUbicacioesDiaVehiculoGps(value).subscribe(
        data => {
          this.vehiculoSeleccionado = data;
          console.log("seleccionado",this.vehiculoSeleccionado);
          //this.setCoordenadasIniciales(this.vehiculoSeleccionado.IotUbicacionVehiculo(0).x,this.vehiculoSeleccionado.IotUbicacionVehiculo(0).y)
          if(this.vehiculoSeleccionado){
            console.log(this.vehiculoSeleccionado.IotUbicacionVehiculos.length);
            this.setCoordenadasIniciales(this.vehiculoSeleccionado.IotUbicacionVehiculos[this.vehiculoSeleccionado.IotUbicacionVehiculos.length-1].ubicacion.y,this.vehiculoSeleccionado.IotUbicacionVehiculos[this.vehiculoSeleccionado.IotUbicacionVehiculos.length-1].ubicacion.x)
        var ultima_posicion=1;
          this.vehiculoSeleccionado.IotUbicacionVehiculos.forEach(element => {
            if(ultima_posicion==this.vehiculoSeleccionado.IotUbicacionVehiculos.length){
              element.labelOptions = {
                color: 'black',
                fontFamily: '',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing:'0.5px',
                text: 'Posición actual',
              }
              element.iconUrl={
                url: "../../../../assets/images/icono_veh.png",
                scaledSize: {
                    width: 40,
                    height: 40
                },
                labelOrigin: { x: 16, y: -8 },            
             }
            }else if(ultima_posicion==1){
              element.labelOptions = {
                color: 'black',
                fontFamily: '',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing:'0.5px',
                text: 'Punto de partida',
              }
              element.iconUrl={
                url: "../../../../assets/images/icono-encuentro.png",
                scaledSize: {
                    width: 40,
                    height: 40
                },
                labelOrigin: { x: 16, y: -8 },            
            }
          } else{
            element.labelOptions = {
              color: 'black',
              fontFamily: '',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing:'0.5px',
              text: element.ubicacion,
            }
            element.iconUrl={
              url: "../../../../assets/images/ubicacion.png",
              scaledSize: {
                  width: 15,
                  height: 15
              },
              labelOrigin: { x: 16, y: -8 },
          }
        }
        ultima_posicion=ultima_posicion+1;
          });
        }
         
        },
        err => {
          console.log(err);
          this.mensajeService.enviarMensaje('Ocurrio un error', 'error');
        });

      }
  });

    /* this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 8
      })
    }); */
    /*
        this.map.on('click', function (args) {
          var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
          console.log(lonlat);

        });*/
  }
  setCoordenadasIniciales(long:number,lati:number){
    this.latitude=lati;
    this.longitude=long;
  }
  onMouseOver(infoWindow, gm,m) {

    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;
    //m.animation = 'BOUNCE';
    m.iconUrl.width= 20;
    m.iconUrl.height= 20;
    infoWindow.open();
  }
  onMouseOut(m,infoWindow) {
    infoWindow.close();
    m.iconUrl.width= 10;
    m.iconUrl.height= 10;
    //m.animation = null;
  }
 /*  obtenerUbicaciones(id_vehiculo_gps:any){
    console.log("vehiculo",id_vehiculo_gps);
  }


  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(16);
  }

  drawPolyline() {

    var data = [
      { long: -77.29408890008928, lat: 1.2321439009463404, date: '27/07/2019 2:00:36- 1' },
      { long: -77.29415327310564, lat: 1.2320151846795255, date: '27/07/2019 2:00:36- 2' },
      { long: -77.2943463921547, lat: 1.2316236726631615, date: '27/07/2019 2:00:36- 3' },
      { long: -77.2944161295891, lat: 1.2314654588867882, date: '27/07/2019 2:00:36- 4' },
      { long: -77.29446172714233, lat: 1.2313769664315117, date: '27/07/2019 2:00:36- 5' },
      { long: -77.29383409023285, lat: 1.231081991559364, date: '27/07/2019 2:00:36- 6' },
      { long: -77.29329764842987, lat: 1.2307816534741818, date: '27/07/2019 2:00:36- 7' },
      { long: -77.29262709617613, lat: 1.2304759521741602, date: '27/07/2019 2:00:36- 8' },
      { long: -77.29164004325865, lat: 1.2299852210666842, date: '27/07/2019 2:00:36- 9' },
      { long: -77.29095071554183, lat: 1.229658066944907, date: '27/07/2019 2:00:36- 10' },
      { long: -77.29015409946442, lat: 1.2292933704995903, date: '27/07/2019 2:00:36- 11' },
      { long: -77.2896498441696, lat: 1.229054708828258, date: '27/07/2019 2:00:36- 12' },
      { long: -77.28912949562074, lat: 1.2288053207668952, date: '27/07/2019 2:00:36- 13' },
      { long: -77.28886127471924, lat: 1.2285639774595154, date: '27/07/2019 2:00:36- 14' },
      { long: -77.28849381208421, lat: 1.2281644201582935, date: '27/07/2019 2:00:36- 15' },
      { long: -77.2882577776909, lat: 1.227896260862238, date: '27/07/2019 2:00:36- 16' },
      { long: -77.28768378496169, lat: 1.2272499968481725, date: '27/07/2019 2:00:36- 17' },
      { long: -77.28694349527358, lat: 1.2264911057111618, date: '27/07/2019 2:00:36- 18' },
      { long: -77.28650361299515, lat: 1.2260057370619108, date: '27/07/2019 2:00:36- 19' },
      { long: -77.28626489639282, lat: 1.2257027168108863, date: '27/07/2019 2:00:36- 20' },
      { long: -77.28607714176178, lat: 1.2255176867292192, date: '27/07/2019 2:00:36- 21' },
      { long: -77.2860261797905, lat: 1.2254667364146457, date: '27/07/2019 2:00:36- 22' },
      { long: -77.28600203990935, lat: 1.2257053984061912, date: '27/07/2019 2:00:36- 23' },
      { long: -77.2859564423561, lat: 1.2263999314964735, date: '27/07/2019 2:00:36 24' }
    ];

    const line_point = [];
    var point_feature = [];

    for (var i = 0; i < data.length; i++) {
      let p_c = ol.proj.fromLonLat([data[i].long, data[i].lat])
      line_point.push(p_c);

      let point_geom = new ol.geom.Point(p_c);
      let p = new ol.Feature(
        { geometry: point_geom, label: data[i].date }
      );

      point_feature.push(p);
    }

    var style = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
        stroke: new ol.style.Stroke({ color: 'red', width: 1 })
      }),
      text: new ol.style.Text({
        textAlign: 'center',
        scale: 1.5,
        fill: new ol.style.Fill({ color: 'rgba(0, 0, 0, 1)' }),
      })
    });

    var vector_layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: point_feature
      }),
      style: function(feature) {
        style.getText().setText(feature.get('label'));
        return [style];
      }
    });

    vector_layer.setZIndex(55);
    this.map.addLayer(vector_layer);

    const routeLayerLine = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.LineString(line_point, 'XY'),
          name: 'Line'
        })]
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: [164, 127, 243, 0.7],
          lineCap: 'round',
          width: 6
        })
      })
    });

    routeLayerLine.setZIndex(54);
    this.map.addLayer(routeLayerLine);
  } */
}
