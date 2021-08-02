import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})

export class RegistrarComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  hide = true;
  iconEye = 'far fa-eye icon' 
  iconSlash = 'far fa-eye-slash icon' 
  actualForm:any;
  mensajeError = '';
  mensajeSuccess = '';

  constructor(
    private fb: FormBuilder, 
    private router:Router,
    private srvAuth: AuthService
    ) {
      this.InicializarFormulario();
  }

  //#region Getters 
  get nombre() {
    return this.actualForm.get('nombre');
  }

  get correo() {
    return this.actualForm.get('correo');
  }

  get username() {
    return this.actualForm.get('username');
  }

  get password() {
    return this.actualForm.get('password');
  }

  get form() {
    return this.actualForm;
  }
  //#endregion Getters 

  ngOnInit(): void {}

  irALogin(){
    this.router.navigateByUrl('/login');
  }

  InicializarFormulario() {
    this.actualForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['',
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.maxLength(50),
        ],
      ],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;      
    }

    this.srvAuth.registrarUsuario(this.form.value)
    .subscribe(
      res => {
        this.mensajeSuccess = 'Usuario creado!';
      },
      err => {
        if(err.error?.errors){
          const dato = err.error?.errors[0];
          if (dato.type == "unique violation") {
            this.mensajeError = dato.value + ' ya existe!';
          }
        }
      },
      () => {this.InicializarFormulario();}
    )    
  }
}
