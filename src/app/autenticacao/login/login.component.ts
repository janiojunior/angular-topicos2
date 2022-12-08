import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(
      private loginService: LoginService,
      private formBuilder: FormBuilder,
      private router: Router) {

    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

   }

  ngOnInit(): void {
  }

  login() {

    console.log(this.form.value);
    this.loginService
      .autenticar(this.form.get("email")?.value, this.form.get("senha")?.value)
      .subscribe({
        next: () => {
            //console.log("Autenticação com sucesso.");
            this.router.navigateByUrl('/usuario')
          },
        error: (erro) => {
          alert('Usuário ou senha inválido');
          console.log(erro);
        }
      });

  }

  getErrorMessage() {
    if (this.form.get("email")?.hasError('required')) {
      return 'O email deve ser informado.';
    }

    return this.form.get("email")?.hasError('email') ? 'Email inválido' : '';
  }

}
