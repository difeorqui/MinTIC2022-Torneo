import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  actualForm;
  mensajeError;

  constructor(
    private fb: FormBuilder, 
    private srvAuth: AuthService,
    private router: Router
    ) {
    this.actualForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.subscription = new Subscription();
    this.mensajeError = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  //#region Getters
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

  irARegistrar(){
    this.router.navigateByUrl('/registrar');
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.subscription.add(
      this.srvAuth.login(this.form.value)
        .subscribe(
          (res: any) => {
            // console.log(res);
          },
          err => console.log(this.mensajeError = "Valida tus datos de acceso!")
        )
    );
  }
}
