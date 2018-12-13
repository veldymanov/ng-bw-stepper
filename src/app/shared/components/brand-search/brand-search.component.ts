import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BrandDto } from 'src/app/core/interfaces/brand-dto';

import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-brand-search',
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <mat-label>Brand</mat-label>
        <input type="text" matInput [formControlName]="fcName"
            [matAutocomplete]="autoBrand"
            (focus)="brandsSearch(brandSearchBox.value)"
            #brandSearchBox (input)="brandsSearch(brandSearchBox.value)">

        <mat-autocomplete #autoBrand="matAutocomplete" [displayWith]="displayWith">
          <mat-option *ngFor="let brand of brands$ | async" [value]="brand">
            {{brand?.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['brand-search.component.scss'],
})
export class BrandSearchComponent implements OnInit, OnDestroy {


  brands$: Observable<BrandDto[]>;
  private brandsTermsSubject$ = new Subject<string>();

  @Input() form: FormGroup;
  @Input() fcName: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.brands$ = this.brandsTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.contactService.getBrands({query: term, limit: 5});
      }),
      catchError(error => of<BrandDto[]>([]))
    );
  }

  ngOnDestroy() {
    this.brandsTermsSubject$.complete();
  }

  brandsSearch(term: string) {
    this.brandsTermsSubject$.next(term);
  }

  displayWith(brand: BrandDto) {
    return brand && brand.name;
  }
}
