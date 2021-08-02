import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as libs from '../libs/libs';
import { ILogin, IUsuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER;
  reqHeaders;

  constructor(
    private hhtpClient: HttpClient,
    private router: Router
    ) { 
    this.AUTH_SERVER = environment.apiUrl;
    this.reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True'
    });
  }

  login(usuario:IUsuario) {
    const uri = this.AUTH_SERVER + environment.login;
    return this.hhtpClient
      .post<ILogin>(uri, usuario, { headers: this.reqHeaders } )
      .pipe(
        tap( (res:any) => {
          if (res) {
            this.saveTokenUser(res);
            this.router.navigateByUrl('/resultados');
          }
        }),
        catchError((err) => this.handleError(err))
      )
  }

  registrarUsuario(usuario:IUsuario) {
    const uri = this.AUTH_SERVER + environment.registrarUsario;
    return this.hhtpClient
      .post<IUsuario>(uri, usuario, { headers: this.reqHeaders } )
  }

  private saveTokenUser(result:any):void {
    libs.saveLocalStorage('torneo', result);
 }

  
  handleError(err:any) {
    if (err.status == 0){
      const res:string = "Servidor fuera de línea";
      return err.message;
    } else {
      return err.error.message;
    }
  }
}
