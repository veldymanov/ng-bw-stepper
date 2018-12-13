import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ClientCompanyDto } from 'src/app/core/interfaces/client-company-dto';

import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-client-company-search',
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <mat-label>Client Company</mat-label>
        <input type="text" matInput [formControlName]="fcName"
            [matAutocomplete]="autoClientCompany"
            (focus)="clientCompaniesSearch(clientCompanySearchBox.value)"
            #clientCompanySearchBox (input)="clientCompaniesSearch(clientCompanySearchBox.value)">

        <mat-autocomplete #autoClientCompany="matAutocomplete" [displayWith]="displayWith">
          <mat-option *ngFor="let company of clientCompanies$ | async" [value]="company">
            {{company?.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['client-company-search.component.scss'],
})
export class ClientCompaniesSearchComponent implements OnInit, OnDestroy {


  clientCompanies$: Observable<ClientCompanyDto[]>;
  private clientCompaniesTermsSubject$ = new Subject<string>();

  @Input() form: FormGroup;
  @Input() fcName: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.clientCompanies$ = this.clientCompaniesTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.contactService.getClientCompanies({query: term, limit: 5});
      }),
      catchError(error => of<ClientCompanyDto[]>([]))
    );
  }

  ngOnDestroy() {
    this.clientCompaniesTermsSubject$.complete();
  }

  clientCompaniesSearch(term: string) {
    this.clientCompaniesTermsSubject$.next(term);
  }

  displayWith(company: ClientCompanyDto) {
    return company && company.name;
  }
}
