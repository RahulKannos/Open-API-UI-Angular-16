import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginModel, LoginResponse } from 'src/app/shared/models/auth.model';
import { UserService } from '../../user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private _auth: AuthService,
    private fb: FormBuilder
  ) {
    debugger;
  }
  ngOnInit(): void {
    this.formBuilder();
  }
  private formBuilder() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    const payload: LoginModel = {
      ...this.loginForm.value,
    };

    this._auth.login(payload).subscribe({
      next: (response: LoginResponse) => {
        if (response.status) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName);
          this.router.navigate(['/home/dashboard']);
        }
      },
    });
  }
}
