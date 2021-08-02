export class Partido {
  idPartido?: number;
  usuario?: number;
  local?: number;
  visitante?: number;
  fecha: Date;
  goles_local?: number;
  goles_visitante?: number;

  constructor() {
    this.fecha = new Date();
  }
}

export interface IPartido {
  idPartido?: number;
  usuario?: number;
  local?: number;
  visitante?: number;
  fecha?: Date;
  goles_local?: number;
  goles_visitante?: number;
}