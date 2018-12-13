import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { BaseDictionaryDto } from '../../../core/interfaces/base-dictionary-dto';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-city-search',
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <mat-label>City</mat-label>
        <input type="text" matInput [formControlName]="fcName"
            [matAutocomplete]="autoCity"
            (focus)="citiesSearch(citySearchBox.value)"
            #citySearchBox (input)="citiesSearch(citySearchBox.value)">

        <mat-autocomplete #autoCity="matAutocomplete" [displayWith]="displayWith">
          <mat-option *ngFor="let city of cities$ | async" [value]="city">
            {{city?.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['city-search.component.scss'],
})
export class CitySearchComponent implements OnInit, OnDestroy {


  cities$: Observable<BaseDictionaryDto[]>;
  private citiesTermsSubject$ = new Subject<string>();

  @Input() form: FormGroup;
  @Input() fcName: string;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.cities$ = this.citiesTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.locationService.getCities({query: term, limit: 5});
      }),
      catchError(error => of<BaseDictionaryDto[]>([]))
    );
  }

  ngOnDestroy() {
    this.citiesTermsSubject$.complete();
  }

  citiesSearch(term: string) {
    this.citiesTermsSubject$.next(term);
  }

  displayWith(city: BaseDictionaryDto) {
    return city && city.name;
  }
}
