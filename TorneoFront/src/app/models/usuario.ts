export class Usuario {
  id?: number;
  nombre?: string;
  correo?: string;
  username?: string;
  password?: string;

  constructor() {}
}

export interface IUsuario {
  id?: number;
  nombre?: string;
  correo?: string;
  username?: string;
  password?: string;
}

export interface ILogin {
  usuario: {
    id: number;
    nombre: string;
  };
  token: string;
}
