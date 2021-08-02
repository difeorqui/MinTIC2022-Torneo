import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IPartido } from '../models/partido';
import * as libs from '../libs/libs';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

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

  registrarPartido(partido:IPartido) {
    const aux:any = libs.getUsuario(); 
    partido.usuario = aux.id;
    console.log(partido);
    const uri = this.AUTH_SERVER + environment.partido;
    return this.hhtpClient
       .post<IPartido>(uri, partido, { headers: this.reqHeaders } )
  }

  editarPartido(id: string, partido:IPartido) {
    const uri = this.AUTH_SERVER + environment.partido + `/${id}`;
    return this.hhtpClient
      .put<IPartido>(uri, partido, { headers: this.reqHeaders } )
  }

  consultarPartido(id: string) {
    const uri = this.AUTH_SERVER + environment.partido + `/${id}`;
    return this.hhtpClient
      .get(uri, { headers: this.reqHeaders } )
  }

  consultarPartidos() {
    const uri = this.AUTH_SERVER + environment.resultado;
    return this.hhtpClient
      .get(uri, { headers: this.reqHeaders } )
  }

  eliminarpartido(id: string) {
    const uri = this.AUTH_SERVER + environment.partido + `/${id}`;
    return this.hhtpClient
      .delete<IPartido>(uri, { headers: this.reqHeaders } )
  }

  
}

