import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as libs from '../../libs/libs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  irARegistrar(){
    this.router.navigateByUrl('/registrarPartido');
  }

  irAResultados(){
    this.router.navigateByUrl('/resultados');
  }
  
  irACrearEquipo(){
    this.router.navigateByUrl('/equipo');
  }

  logOut(){
    libs.deleteLocalStorage('torneo');
    this.router.navigateByUrl('/login');
  }

  isLogged():boolean {
    const result =libs.getUsuario();
    return result != '';
  }

  nombreUsuario():string {
    const result:any = libs.getUsuario();
    try {
      return result.nombre;
    } catch (error) {
      return 'Anánimo';
    }
  }

}
