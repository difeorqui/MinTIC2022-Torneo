import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Equipo, IEquipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';
import * as libs from '../../libs/libs';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  actualForm:any;
  mensajeError = '';
  mensajeSuccess = '';
  equipos:any = [];
  itemEdit: IEquipo = new Equipo();

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private srvEquipo: EquipoService
  ) { 
    this.InicializarFormulario();
  }

    //#region Getters 
    get nombre() {
      return this.actualForm.get('nombre');
    }
  
    get form() {
      return this.actualForm;
    }
    //#endregion Getters 
  
    ngOnInit(): void {
      if (!this.isLogged()) {
        this.router.navigateByUrl('/login');
      }
      this.consultarEquipos();
    }
    
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
  
  irAResultados(){
    if (this.itemEdit.id) {
      this.itemEdit = new Equipo();
      this.InicializarFormulario();
    } else {
      this.router.navigateByUrl('/resultados');
    }
  }

  InicializarFormulario() {
    this.actualForm = this.fb.group({
      nombre: [this.itemEdit.nombre, [Validators.required, Validators.maxLength(20)]]
    });
  }

  editItem(item:IEquipo){
    this.itemEdit = item;
    this.InicializarFormulario();
  }

  deleteItem(id:string){
    const result = window.confirm("¿Deseas continuar con la eliminación?");
    if(!result) return;

    this.srvEquipo.eliminarEquipo(id)
      .subscribe(
        res => { this.mensajeSuccess = 'Equipo eliminado!'; },
        err => this.mensajeError = 'El equipo no puede ser eliminado.',
        () => this.consultarEquipos()
      )
  }

  consultarEquipos(){
    this.srvEquipo.consultarEquipo()
      .subscribe(
        res => { this.equipos = res },
        err => console.log(err)
      )
  }

  registrarEquipo(){
    this.srvEquipo.registrarEquipo(this.form.value)
    .subscribe(
      res => {
        this.mensajeSuccess = 'Equipo creado!';
      },
      err => {
        if(err.error?.errors){
          const dato = err.error?.errors[0];
          if (dato.type == "unique violation") {
            this.mensajeError = dato.value + ' ya existe!';
          }
        }
      },
      () => {
        this.InicializarFormulario();
        this.consultarEquipos();
      }
    )    
  }

  editarEquipo(){
    let id: string = '';
    if(this.itemEdit.id){
      id = this.itemEdit.id.toString();
    }

    this.srvEquipo.editarEquipo(id, this.form.value)
    .subscribe(
      res => {
        this.mensajeSuccess = 'Equipo editado!';
      },
      err => {
        if(err.error?.errors){
          const dato = err.error?.errors[0];
          if (dato.type == "unique violation") {
            this.mensajeError = dato.value + ' ya existe!';
          }
        }
      },
      () => {
        this.itemEdit = new Equipo();
        this.InicializarFormulario();
        this.consultarEquipos();
      }
    )    
  }

  onSubmit() {
    if (this.form.invalid) {
      return;      
    }
    if (this.itemEdit.id) {
      this.editarEquipo();
    } else {
      this.registrarEquipo();
    }
  }



}
