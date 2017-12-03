import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const DEFAULT_ERROR = 'Произошла ошибка входа. Попробуйте позже.';
const AUTH_ERROR_CODE = 'auth/wrong-password';
const errorMessages = {
  DEFAULT: 'Неизвестная ошибка. Попробуйте позже.',
  AUTH_ERROR_CODE: 'Неверные имя пользователя и пароль.'
};

@Component({
  selector: 'tfs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.form.setValue({
      email: 'aaa@ab.com',
      password: '123456'
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.errorMessage = '';
    const {email, password} = this.form.value;

    this.authService.login({email, password})
      .subscribe((result) => {
          this.clearForm();
        },
        (error) => {
          this.handleLoginError(error);
        });
  }

  handleLoginError(error: any) {
    let errorMessage = errorMessages.DEFAULT;

    if (error && error.code === AUTH_ERROR_CODE) {
      errorMessage = errorMessages.AUTH_ERROR_CODE;
    }

    this.errorMessage = errorMessage;
  }

  clearForm() {
    this.form.setValue({
      email: '',
      password: ''
    });
  }
}
