import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CredentialsDto } from '../core/interfaces/credentials-dto';
import { SignedInDto } from '../core/interfaces/signed-in-dto';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) { this.goToApp(); }
    this.formCreate();
  }

  public login() {
    const payload: CredentialsDto = {
      email: this.form.value.emailFC,
      password:  this.form.value.passwordFC
    };

    this.authService.login(payload)
      .subscribe((user: SignedInDto) => this.goToApp());
  }

  private formCreate(): void {
    this.form = this.fb.group({
      emailFC: ['', [Validators.required, Validators.email]],
      passwordFC: ['', Validators.required]
    });
  }

  private goToApp() {
    console.log('User is logged in');
    this.router.navigateByUrl('/');
  }
}
