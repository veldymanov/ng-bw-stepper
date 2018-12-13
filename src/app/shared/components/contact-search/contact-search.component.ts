import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { ContactDto } from '../../../core/interfaces/contact-dto';

import { ContactService } from '../../../core/services/contact.service';
import { FormsService } from '../../../core/services/forms.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent implements OnInit, OnDestroy {

  @Input() public creditFG: FormGroup;
  @Input() public creditContactFC: FormControl;
  @Input() public creditContactFcKey: string;
  @Input() public creditContactNameFC: FormControl;
  @Input() public creditContactNameFcKey: string;

  public contacts$: Observable<ContactDto[]>;

  private contactsTermsSubject$ = new Subject<string>();

  constructor(
    private contactService: ContactService,
    private formsService: FormsService
  ) { }

  ngOnInit() {
    this.contactsSearchSetup();
    setTimeout(() => this.enableControl(this.creditFG, this.creditContactNameFC.value), 0);
  }

  ngOnDestroy(): void {
    this.contactsTermsSubject$.complete();
  }

  public contactChosen(fg: FormGroup, contact: ContactDto, term: string) {
    this.contactChoose(contact);
    this.enableControl(fg, term);
  }

  public contactsSearch(term: string): void {
    this.contactsTermsSubject$.next(term);
  }

  private contactsSearchSetup() {
    this.contacts$ = this.contactsTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.contactService.getConacts({query: term, limit: 5});
      }),
      catchError(error => of<ContactDto[]>([]))
    );
  }

  public inputChanged(term: string, fg: FormGroup): void {
    this.contactsSearch(term);
    this.contactCheck();
    this.enableControl(fg, term);
  }

  private contactCheck() {
    if (this.creditContactNameFC.value !== this.creditContactFC.value.name) {
      this.creditContactFC.patchValue({name: this.creditContactNameFC.value});
    }
  }

  private contactChoose(contact: ContactDto) {
    this.creditContactFC.patchValue(contact);
  }

  private enableControl(fg: FormGroup, term: string): void {
    term.length
      ? this.formsService.formGroupEnable(fg, [this.creditContactFcKey, this.creditContactNameFcKey])
      : this.formsService.formGroupDisable(fg, [this.creditContactFcKey, this.creditContactNameFcKey]);
  }
}
