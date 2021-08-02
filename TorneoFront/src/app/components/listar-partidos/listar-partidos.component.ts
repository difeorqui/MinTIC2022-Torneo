import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPartido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';
import { environment } from 'src/environments/environment';
import * as libs from '../../libs/libs';

@Component({
  selector: 'app-listar-partidos',
  templateUrl: './listar-partidos.component.html',
  styleUrls: ['./listar-partidos.component.css']
})
export class ListarPartidosComponent implements OnInit {
  partidos:any = [];
  mensajeError = '';
  mensajeSuccess = '';

  constructor(
    private router: Router,
    private srvPartido: PartidoService
    ) { }

  ngOnInit(): void {
    if (!this.isLogged()) {
      this.router.navigateByUrl('/login');
    }
    this.consultarEquipos();
  }
  
  //#region Validar token expira
  expiroToken(token:string): boolean {
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      const ahora = (Math.floor((new Date).getTime() / 1000)) ;
      return (decodedToken.expiresIn - ahora) <= 0;
    } catch (error) {
        return true;      
    }
  }
  
  isLogged():boolean {
    const token = libs.getToken();
    const result = this.expiroToken(token);
    if (result){
      libs.deleteLocalStorage('torneo');
    }
    return !result;
  }
  //#endregion
  
  validarEdit(item:IPartido) {
    return (item.goles_local == null);
  }

  consultarEquipos(){
    this.srvPartido.consultarPartidos()
      .subscribe(
        res => { this.partidos = res },
        err => console.log(err)
      )
  }

  editItem(item:any) {
    const url = `/registrarPartido?id=${item.idPartido}`;
    this.router.navigateByUrl(url);
  }

  deleteItem(id:string){
    const result = window.confirm("¿Deseas continuar con la eliminación?");
    if(!result) return;

    this.srvPartido.eliminarpartido(id)
      .subscribe(
        res => { this.mensajeSuccess = 'Partido eliminado!'; },
        err => this.mensajeError = 'El partido no puede ser eliminado.',
        () => this.consultarEquipos()
      )
  }

}
