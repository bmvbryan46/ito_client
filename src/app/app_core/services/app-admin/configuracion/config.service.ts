import { Injectable } from '@angular/core';
import Config from './config';
import swal from 'sweetalert2';

@Injectable()
export class ConfigService {

  getApiUrl() {
    return Config.ApiUrl;
  }

  getModuloId() {
    return Config.modulo_id;
  }
}
