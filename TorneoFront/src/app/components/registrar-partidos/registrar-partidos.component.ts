import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPartido } from 'src/app/models/partido';
import { EquipoService } from 'src/app/services/equipo.service';
import * as libs from '../../libs/libs'
import * as moment from 'moment';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
  selector: 'app-registrar-partidos',
  templateUrl: './registrar-partidos.component.html',
  styleUrls: ['./registrar-partidos.component.css']
})
export class RegistrarPartidosComponent implements OnInit {
  private soloEnterosPattern = '^[0-9]+$';
  equipos:any = [];
  actualForm:any;
  paramPartido:any;
  mensajeError = '';
  mensajeSuccess = '';
  
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private srvEquipo: EquipoService,
    private srvPartido: PartidoService 
    ) { }

  ngOnInit(): void {
    if (!this.isLogged()) {
      this.router.navigateByUrl('/login');
    }
    this.consultarEquipos();
    this.inicializarFormulario();
    this.validarParametros();
  }
  
  //#region getters
  get fecha() {
    return this.actualForm.get('fecha');
  }

  get local() {
    return this.actualForm.get('local');
  }

  get visitante() {
    return this.actualForm.get('visitante');
  }

  get form() {
    return this.actualForm;
  }
  //#endregion

  //#region valdar token
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

  inicializarFormulario() {
    this.actualForm = this.fb.group({
      fecha: ['', Validators.required],
      local: ['--Selecciona--', Validators.required],
      visitante: ['--Selecciona--', Validators.required],
      goles_local: [''],
      goles_visitante: ['']
    });
  }

  inicializarFormularioSoloGoles() {
    let equipoLocal;
    let equipoVisitante;
    this.equipos.forEach((item:any) => {
      if (item.id == this.paramPartido.local) {
        equipoLocal = item.nombre;
      } 
      if (item.id == this.paramPartido.visitante) {
        equipoVisitante = item.nombre;
      } 
    });
    this.paramPartido.local = equipoLocal;
    this.paramPartido.visitante= equipoVisitante;
    
    this.actualForm = this.fb.group({
      fecha: [this.paramPartido.fecha, Validators.required],
      local: [this.paramPartido.local, Validators.required],
      visitante: [this.paramPartido.visitante, Validators.required],
      goles_local: [''],
      goles_visitante: ['']
    });
  }

  soloGoles(){
    if(this.paramPartido) {
      return true;
    } else {
      return false;
    }
  }

  validarParametros() {
    this.route.queryParams
      .subscribe(params => {
        this.paramPartido = undefined;
        const id = params['id'];
        if(id){
          this.srvPartido.consultarPartido(id)
          .subscribe(
            res => { 
              this.paramPartido = res;
              this.inicializarFormularioSoloGoles();
            },
            err => { console.log(err) }
          )
        } 
      })
  }

  irAResultados(){
    this.router.navigateByUrl('/resultados');
  }
  
  consultarEquipos(){
    this.srvEquipo.consultarEquipo()
      .subscribe(
        res => { 
          this.equipos = res; 
        },
        err => console.log(err)
      )
  }

  validarErrores(): boolean{
    if (this.local.value == '--Selecciona--' || this.visitante.value == '--Selecciona--'){
      this.mensajeError = 'No has seleccionado los equipos!';
      return false;
    } else if (this.local.value == this.visitante.value ){ 
      this.mensajeError = 'Los equipos deben ser diferentes!';
      return false;
    } else if (this.paramPartido){
      try {
        let goles:number = parseInt(this.paramPartido.goles_local); 
        goles = parseInt(this.paramPartido.goles_visitante); 
        return true;
      } catch (error) {
        this.mensajeError = 'Los goles no son válidos!';
        return false;
      }
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;      
    }

    if (!this.validarErrores()){
      return;
    }

    let partido:IPartido = this.form.value;
    if (!this.paramPartido){
      delete partido.goles_local;
      delete partido.goles_visitante;
      this.srvPartido.registrarPartido(this.form.value)
      .subscribe(
        res => {
          this.router.navigateByUrl('/resultados');
        },
        err => {
          this.mensajeError = 'El partido no puede ser creado, es probable que haya sido programado.';
        }
      )    
    } else {

      const result = window.confirm(`Después de guardar los resultados no se pueden modificar.\n ¿Deseas continuar con el resultad ${partido.local} (${partido.goles_local}) - ${partido.visitante} (${partido.goles_visitante})?`);
      if(!result) return;

      delete partido.fecha;
      delete partido.idPartido;
      delete partido.local;
      delete partido.usuario;
      delete partido.visitante;

      console.log(this.paramPartido.id);
      console.log(partido);
      this.srvPartido.editarPartido(this.paramPartido.id, partido)
      .subscribe(
        res => {
          this.router.navigateByUrl('/resultados');
        },
        err => {
          this.mensajeError = 'El partido no puede ser editado.';
        }
      )    

    }
    
  }


}
