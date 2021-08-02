export class Resultado {
  fecha: Date;
  idPartido?: number;
  id?: number;
  usuario: string;
  local: string;
  goles_local?: number;
  visitante: string;
  goles_visitante?: number;

  constructor() {
    this.usuario = '';
    this.local = '';
    this.visitante = '';
    this.fecha = new Date();
  }
}
