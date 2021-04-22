import { Injectable } from '@angular/core';

import swal from 'sweetalert2';

@Injectable()
export class MensajeService {

  /**
   * Mensaje general de los mensajes de error
   */
  darMensajeErrorServidor() {
    return 'Ha ocurrido un error inesperado, por favor intente nuevamente o comuniquese con el administrador';
  }

  /**
   * Obtener el tipo y el titulo del mensaje para sweetalert2
   * @param pTipo tipo del mensaje
   */
  darTiposMensaje(pTipo) {

    let titulo = '';
    let tipo = 'error';
    let color = '#EC2327';

    if (pTipo != null && pTipo != '') {
      let miTipo = pTipo.toLowerCase();
      if (miTipo == 's' || miTipo == 'success') {
        titulo = '';
        color ='#00923f';
        tipo = 'success';
      } else if (miTipo == 'w' || miTipo == 'warning') {
        titulo = '';
        color = '#FBB03B';
        tipo = 'warning';
      } else if (miTipo == 'e' || miTipo == 'error') {
        titulo = '';
        color = '#EC2327';
        tipo = 'error';
      } else if (miTipo == 'i' || miTipo == 'info') {
        titulo = '';
        tipo = 'info';
        color = '#25B7D3';
      } else if (miTipo == 'q' || miTipo == 'question') {
        titulo = '';
        color = '#8ac23f';
        tipo = 'question';
      }
    }
    let mensaje = {
      titulo: titulo,
      color: color,
      tipo: tipo
    }
    return mensaje;
  }


  /**
   * Metodo que genera un preloader de sweetalert2
   * @param title Titulo del preloader se establece como procesando por defecto
   * @param allowOutsideClick Si desea que se cierre haciendo clic en cualquier lado de la pantalla
   */
  procesando(title = 'Procesando', allowOutsideClick = false) {
    swal({
      title: title,
      html: 'Por favor espere un momento mientras procesamos su solicitud.',
      allowOutsideClick: allowOutsideClick,
      onOpen: () => {
        swal.showLoading()
      }
    })
  }

  cerrarMensaje() {
    swal.close();
  }


  /**
   * Metodo general de envio de mensajes
   * @param pText Cuerpo del alert
   * @param pTipo Tipo de alert
   * @param allowOutsideClick Si desea que se cierre haciendo clic en cualquier lado de la pantalla
   * @param time tiempo de retardo en mostrar el mensaje
   */
  enviarMensaje( pText, pTipo, allowOutsideClick = false, time = 250) {
    let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
    setTimeout(() => {
      swal({
        html: pText,
        type: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        confirmButtonColor: rTipoMensaje.color,
        confirmButtonText: 'Aceptar'
      })
    }, time);
  }

  enviarMensajeTime( pText, allowOutsideClick = false, timehide=1000,time = 250) {
    //let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
    setTimeout(() => {
      swal({
        html: pText,
        allowOutsideClick: allowOutsideClick,
        timer:timehide,
        showConfirmButton:false
      })
    }, time);
  }

  /**
   * Metodo que envia a una funcion
   * @param pText Cuerpo del alert
   * @param pTipo Tipo de alert
   * @param allowOutsideClick Si desea que se cierre haciendo clic en cualquier lado de la pantalla
   * @param time tiempo de retardo en mostrar el mensaje
   */
  enviarMensajeFuncion( pText, pTipo, funcionEvento, allowOutsideClick = false, time = 250, ) {
    let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
    setTimeout(() => {
      swal({
        html: pText,
        type: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        confirmButtonColor: rTipoMensaje.color,
        confirmButtonText: 'Aceptar',
      }).then(function () {
        funcionEvento();
      })
    }, time);
  }


  /**
   * Metodo que renderiza mensajes de error enviados desde el servidor
   * @param error JSON en formato { 'error': 'Mi error' }
   * @param time tiempo de retardo en mostrar el mensaje
   */
  mensajeErrorServidor(error, time = 250) {

    let titulo = '';
    let message = this.darMensajeErrorServidor();

    let tipo = null;

    if (error != null && error.error != null) {

      let errorValor = error.error;
      if (errorValor.titulo != null && errorValor.titulo != '') {
        titulo = errorValor.titulo;
      }

      if (errorValor.error != null && errorValor.error != '') {
        tipo = typeof (errorValor.error);
        message = errorValor.error
      }
    }
    setTimeout(() => {
      swal({
        title: titulo,
        html: message,
        type: 'error',
        confirmButtonColor: '#EC2327',
        confirmButtonText: 'Aceptar',
      })
    }, time);
  }


  /**
   * Metodo que renderiza mensajes enviados desde el servidor que no sean errores
   * @param data se recibe un JSON { msj:{titulo:'Mi titulo', mensaje:'Mi mensaje'} }
   * @param pTipo se recibe el tipo de alert
   * @param time tiempo de retardo en mostrar el mensaje
   */
  mensajeServidor(data, pTipo, time = 250) {

    let titulo = '';
    let message = '';

    let tipoMensaje = <any>this.darTiposMensaje(pTipo);

    if (data != null && data.msj != null) {
      let dataMensaje = data.msj;
      if (dataMensaje.titulo != null && dataMensaje.titulo != '') {
        titulo = dataMensaje.titulo;
      }

      if (dataMensaje.mensaje != null && dataMensaje.mensaje != '') {
        message = dataMensaje.mensaje
      }
    }

    setTimeout(() => {
      swal({
        title: titulo,
        html: message,
        type: tipoMensaje.tipo,
        confirmButtonColor: '#EC2327',
        confirmButtonText: 'Aceptar',
      })
    }, time);
  }

  /**
   * Metodo que renderiza un input solicitando alguna información
   * @param mensaje Mensaje o información que desea solicitar
   * @param mensajeplace Mensaje de placeholder para el input
   * @param tipoinput Tipo de input solo permite  text y textarea
   * @param valordefault Valor que se desea dejar por defecto
  */
  mensajeInput(mensaje, mensajeplace, tipoinput, valordefault) {
    return new Promise(function (resolve, reject) {
      swal({
        html: mensaje,
        input: tipoinput,
        inputValue: valordefault,
        inputPlaceholder: mensajeplace,
        showCancelButton: true,
        type: "info",
        confirmButtonColor: '#25B7D3',
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#EC2327',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(function (resultado) {
        if (resultado.value) {
          resolve(resultado.value);
        }
      }).catch(function (error) {
        reject(error);
      });
    });

  }

/**
 * Metodo que renderiza un mensaje de confirmación de una acción
 * @param pText Texto de se visualiza como mensaje de confirmación
 * @param allowOutsideClick Si desea que se cierre haciendo clic en cualquier lado de la pantalla
 * @param time tiempo de retardo en mostrar el mensaje
 */
  mensajeConfimacion( pText,allowOutsideClick = false, time = 250, ) {

    var self = this;
    return new Promise(function (resolve, reject) {
      swal({
        html: pText,
        type: 'question',
        allowOutsideClick: allowOutsideClick,
        showCancelButton: true,
        confirmButtonColor: '#8ac23f',
        cancelButtonColor: '#EC2327',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
      }).then(result => {
        if (result.value) {
          resolve({ "mensaje": "aceptar click" });
        }
        else {
          reject({ "cancelado": "operacion cancelada" });
        }
      });
    });
  }

}
