import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IEquipo } from '../models/equipo';
import * as libs from '../libs/libs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  AUTH_SERVER;
  reqHeaders;

  constructor(
    private hhtpClient: HttpClient,
    private router: Router
    ) { 
    this.AUTH_SERVER = environment.apiUrl;
    this.reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'torneo-token': libs.getToken(),
      'No-Auth': 'True'
    });
  }

  registrarEquipo(equipo:IEquipo) {
    const uri = this.AUTH_SERVER + environment.equipo;
    return this.hhtpClient
      .post<IEquipo>(uri, equipo, { headers: this.reqHeaders } )
  }

  editarEquipo(id: string, equipo:IEquipo) {
    const uri = this.AUTH_SERVER + environment.equipo + `/${id}`;
    return this.hhtpClient
      .put<IEquipo>(uri, equipo, { headers: this.reqHeaders } )
  }

  eliminarEquipo(id: string) {
    const uri = this.AUTH_SERVER + environment.equipo + `/${id}`;
    return this.hhtpClient
      .delete<IEquipo>(uri, { headers: this.reqHeaders } )
  }

  consultarEquipo() {
    const uri = this.AUTH_SERVER + environment.equipo;
    return this.hhtpClient
      .get(uri, { headers: this.reqHeaders } )
  }

}
