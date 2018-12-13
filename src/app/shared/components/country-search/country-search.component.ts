import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { BaseDictionaryDto } from '../../../core/interfaces/base-dictionary-dto';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-country-search',
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <mat-label>Country</mat-label>
        <input type="text" matInput [formControlName]="fcName"
            [matAutocomplete]="autoCountry"
            (focus)="countriesSearch(countrySearchBox.value)"
            #countrySearchBox (input)="countriesSearch(countrySearchBox.value)">

        <mat-autocomplete #autoCountry="matAutocomplete" [displayWith]="displayWith">
          <mat-option *ngFor="let country of countries$ | async" [value]="country">
            {{country?.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['country-search.component.scss'],
})
export class CountrySearchComponent implements OnInit, OnDestroy {


  countries$: Observable<BaseDictionaryDto[]>;
  private countriesTermsSubject$ = new Subject<string>();

  @Input() form: FormGroup;
  @Input() fcName: string;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.countries$ = this.countriesTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.locationService.getCountries({query: term, limit: 5});
      }),
      catchError(error => of<BaseDictionaryDto[]>([]))
    );
  }

  ngOnDestroy() {
    this.countriesTermsSubject$.complete();
  }

  countriesSearch(term: string) {
    this.countriesTermsSubject$.next(term);
  }

  displayWith(country: BaseDictionaryDto) {
    return country && country.name;
  }
}
