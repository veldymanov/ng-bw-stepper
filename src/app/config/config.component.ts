import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import * as moment from 'moment';

import { Config, ConfigService } from './config.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  hundred: number[] = [];

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {
    this.checkMoment();

    for(let i = 0; i < 100; i++) {
      this.hundred.push(i);
    }
  }

  showConfig() {
    this.configService.getUsers()
      .subscribe(
        (data: Config) => console.log('data', data),
        error => console.log('error', error)
      );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      .subscribe((resp: HttpResponse<Config>) => {
        console.log('resp: HttpResponse<Config>)', resp);
      });
  }

  logout() {
    this.authService.logout();
    this.checkMoment();
  }

  makeError() {
    this.configService.makeIntentionalError().subscribe(
      resp => console.log('resp', resp),
      error => console.log('error', error)
    );
  }

  private checkMoment() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    console.log(moment(expiresAt).toDate());
    console.log(moment().isBefore(expiresAt));
  }
}
