import { async } from '@angular/core/testing';
import { ContactService } from './../../../core/services/contact.service';
import { TitleDto } from './../../../core/interfaces/title-dto';
import { BaseDictionaryDto } from 'src/app/core/interfaces/base-dictionary-dto';
import { LocationService } from './../../../core/services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent implements OnInit {

  loading = false;

  public cities$: Observable<BaseDictionaryDto[]>;
  public countries$: Observable<BaseDictionaryDto[]>;
  public titles$: Observable<TitleDto[]>;

  constructor(
    private locationService: LocationService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getCities();
    this.getCountries();
    this.getTitles();
  }

  getCities() {
    this.loading = true;
    this.cities$ = this.locationService.getCities({});
    this.cities$.subscribe(() => this.loading = false);
  }

  getCountries() {
    this.loading = true;
    this.countries$ = this.locationService.getCountries({});
    this.countries$.subscribe(() => this.loading = false);
  }

  getTitles() {
    this.loading = true;
    this.titles$ = this.contactService.getConactsTitles({});
    this.titles$.subscribe(() => this.loading = false);
  }

  deleteCity(id) {
    this.locationService.deleteCity(id)
      .subscribe(() => this.getCities());
  }

  deleteCountry(id) {
    this.locationService.deleteCountry(id)
      .subscribe(() => this.getCountries());
  }

  deleteTitle(id) {
    this.contactService.deleteTitle(id)
      .subscribe(() => this.getTitles());
  }

  addCity(city) {
    this.locationService.addCity(city)
      .subscribe(() => this.getCities());
  }

  addCountry(country) {
    this.locationService.addCountry(country)
      .subscribe(() => this.getCountries());
  }

  addTitle(title) {
    this.contactService.addTitle(title)
      .subscribe(() => this.getTitles());
  }
}
