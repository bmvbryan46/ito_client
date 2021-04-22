import { Component, Input } from '@angular/core';
import { navItems ,cdn} from '../../_nav';
// import { InfoUsuarioService } from '../../app-core/services/datos-usuario/info-usuario.service';
import config from '../../app_core/services/app-admin/configuracion/config';
// import { MensajeService } from '../../app-core/services/app-admin/mensaje/mensaje.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-jdashboard',
  templateUrl: './j-layoutsin.component.html'
})
export class JLayoutsinComponent {
  public navItems:any;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public usuario : any;
  public foto: any;
  public mobile: any;
  public cdn: any;
  public year: any;
  public login:any;

  constructor(
    // private serviceInfoUsuario: InfoUsuarioService,
    // private serviceMensaje: MensajeService,
    private serviceCookie: CookieService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.usuario={
      Persona:{
        foto_persona:"/default.jpg"
      }
    }
  }

  ngOnInit() {
    this.login=config.Login;
    this.cdn = cdn;
    this.navItems = navItems;
    this.year = new Date(Date.now()).getFullYear();
    // this.navItems=[{
    //   title: true,
    //   name: 'Administración'
    // }];



    // this.serviceInfoUsuario.obtenerInformacionUsuario()
    // .subscribe((res)=>{

    //   this.usuario=res;
    //   this.foto=config.fotoUrl+this.usuario.Persona.foto_persona;

    //   this.serviceInfoUsuario.obtenerRutas()
    //   .subscribe((rutas)=>{

    //     this.navItems= navItems;
    //     //this.construirRutas(rutas);
    //   },error=>{
    //     this.serviceMensaje.enviarMensajeFuncion('Error','No se pudo autenticar su sesion','e', function(){
    //       window.location.href=config.Login;
    //     });
    //   });
    // },error=>{
    //   this.serviceMensaje.enviarMensajeFuncion('Error','No se pudo autenticar su sesion','e', function(){
    //     window.location.href=config.Login;
    //   });
    // });

    // if (window.screen.width < 769) { // 768px portrait
    //   this.mobile = true;
    // }

  }

  toggleButton() {
    const x: any = document.querySelector('barrita');
    x.classList.toggle('push-right');
  }

  construirRutas(rutas){
    rutas.forEach(element => {
      var objeto={
        name: element.detalle_nivel,
        url: element.direccion_ruta,
        icon: element.icon?element.icono:'fa fa-chevron-circle-right',
        children: new Array()
      };
      if(element.hijos){
        if(element.hijos.length>0){

          var childs= new Array();
          element.hijos.forEach(hijo => {

            var aux={
              name: hijo.detalle_nivel,
              url: hijo.direccion_ruta,
            }
            childs.push(aux);
            //quede aqui para continuar en casa
          });
          objeto.children= childs;
        }
        else{
          delete objeto.children;
        }
      } else{
        delete objeto.children;
      }

      this.navItems.push(objeto);

    });
  }

  // cerrarSesion(){

  //   this.serviceInfoUsuario.cerrarSesion()
  //   .subscribe((res)=>{
  //     this.serviceCookie.deleteAll();
  //     window.location.href=config.Login;
  //   },error=>{
  //     this.serviceCookie.deleteAll();
  //     window.location.href=config.Login;
  //   });
  // }

  // irhome(){
  //   window.location.href=config.Login+"/jdashboard";
  // }
}
