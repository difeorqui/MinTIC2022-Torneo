import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes a ser enrutados
import { LoginComponent } from '../app/components/login/login.component';
import { RegistrarComponent } from '../app/components/registrar/registrar.component';
import { RegistrarPartidosComponent } from '../app/components/registrar-partidos/registrar-partidos.component';
import { ListarPartidosComponent } from '../app/components/listar-partidos/listar-partidos.component';
import { EquipoComponent } from '../app/components/equipo/equipo.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component:  RegistrarComponent
  },
  {
    path: 'equipo',
    component:  EquipoComponent
  },
  {
    path: 'registrarPartido',
    component: RegistrarPartidosComponent
  },
  {
    path: 'resultados',
    component: ListarPartidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
