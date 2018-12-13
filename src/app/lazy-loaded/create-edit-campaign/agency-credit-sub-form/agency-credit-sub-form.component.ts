import { Component, Input,  OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { ContactDto } from '../../../core/interfaces/contact-dto';

import { ContactService } from '../../../core/services/contact.service';


@Component({
  selector: 'app-agency-credit-sub-form',
  templateUrl: './agency-credit-sub-form.component.html',
  styleUrls: ['./agency-credit-sub-form.component.scss']
})
export class AgencyCreditSubFormComponent implements OnInit, OnDestroy {

  @Input() public contactFG: FormGroup;

  public contacts$: Observable<ContactDto[]>;

  private contactsTermsSubject$ = new Subject<string>();

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.contactsSearchSetup();
  }

  ngOnDestroy(): void {
    this.contactsTermsSubject$.complete();
  }

  public contactCheck(fg: FormGroup, formControlName: string) {
    if (fg.value[formControlName]) {
      if (fg.value[formControlName] !== fg.value.contact[formControlName]) {
        fg.patchValue({contact: {name: fg.value[formControlName]}});
      }
    }
  }

  public contactChoose(fg: FormGroup, contact: ContactDto) {
    fg.patchValue({contact: contact});
  }

  public contactsSearch(term: string): void {
    this.contactsTermsSubject$.next(term);
  }

  private contactsSearchSetup(): void {
    this.contacts$ = this.contactsTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.contactService.getConacts({query: term, limit: 5});
      }),
      catchError(error => of<ContactDto[]>([]))
    );
  }

}
