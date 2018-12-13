import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';
import { of, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { ContactDto } from '../../core/interfaces/contact-dto';
import { FileDto } from '../../core/interfaces/file-dto';
import { TitleDto } from '../../core/interfaces/title-dto';

import { ContactService } from '../../core/services/contact.service';
import { FormsService } from '../../core/services/forms.service';
import { NotificationService } from '../../core/services/notification.service';
import { TitlesValidator } from '../../core/validators/titles.validator';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-edit-contact',
  templateUrl: './create-edit-contact.component.html',
  styleUrls: ['./create-edit-contact.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CreateEditContactComponent implements OnInit, OnDestroy {

  public contact: ContactDto;
  public contactIsNew: boolean;
  public form: FormGroup;
  public files: FileDto[];
  public loading: boolean;
  public titles$: Observable<TitleDto[]>;

  private paramMapSubscription: Subscription;
  private titlesTermsSubject$ = new Subject<string>();

  get emailFA(): FormArray { return this.form.get('emailFA') as FormArray; }
  get phoneFA(): FormArray { return this.form.get('phoneFA') as FormArray; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private notificationService: NotificationService,
    private titlesValidator: TitlesValidator
  ) { }

  ngOnInit(): void {
    this.formCreate();
    this.titlesSearchSetup();

    this.paramMapSubscription = this.activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        const contactId: string = params.get('contactId');

        if (!contactId) {
          this.contactIsNew = true;
          this.files = [];
          this.formUpdate();
        } else {
          this.loading = true;
          this.contactIsNew = false;

          this.contactService.getContact(+contactId)
            .subscribe(
              (contact: ContactDto) => {
                this.contact = contact;
                this.files = contact.files;
                this.formUpdate();
                this.loading = false;
              },
              (err) => this.loading = false
            );
        }
      });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  public cancelChanges(): void {
    this.formUpdate();
    this.form.markAsPristine();
  }

  public emailAdd() {
    this.emailFA.push(this.formBuilder.control('', [Validators.required, Validators.email]));
    this.formsService.markFormGroupTouched(this.form);
  }

  public emailRemove(index: number): void {
    this.emailFA.removeAt(index);
  }

  public formSubmit(): void {
    this.loading = true;

    const emails: string[] = this.emailFA.value.map((email: string) => email);
    const files: FileDto[] = this.files;
    const phones: string[] = this.phoneFA.value.map((phone: string) => phone);

    const payload: ContactDto = {
      agency: this.form.value.agencyFC,
      dob: this.form.value.dobFC ? moment(this.form.value.dobFC).utc().format() as any : undefined,
      city: this.form.value.cityFC,
      country: this.form.value.countryFC,
      email: emails,
      facebook: this.form.value.facebookFC,
      files: files,
      id: this.contact ? this.contact.id : undefined,
      instagram: this.form.value.instagramFC,
      linkedin: this.form.value.linkedinFC,
      name: this.form.value.nameFC,
      phone: phones,
      portfolio: this.form.value.portfolioFC,
      title: this.form.value.titleFC,
    };

    this.contactService.saveContact(payload)
      .subscribe(
        (contact: ContactDto) => {
          this.contact = contact;
          this.form.markAsPristine();
          this.notificationService.success('Saved', 'Contact');
          this.loading = false;
        },
        (err) => {
          this.form.markAsDirty();
          this.loading = false;
        }
      );
  }

  public onUploadsChanged(files: FileDto[]): void {
    this.files = files;
    this.form.markAsDirty();
  }

  public phoneAdd() {
    this.phoneFA.push(this.formBuilder.control('', [Validators.required]));
    this.formsService.markFormGroupTouched(this.form);
  }

  public phoneRemove(index: number): void {
    this.phoneFA.removeAt(index);
  }

  public titlesSearch(term: string): void {
    this.titlesTermsSubject$.next(term);
  }

  private formCreate(): void {
    this.form = this.formBuilder.group({
      agencyFC: ['', []],
      dobFC: [{value: null, diabled: false}, []],
      cityFC: ['', []],
      countryFC: ['', []],
      emailFA: this.formBuilder.array([]),
      facebookFC: ['', []],
      instagramFC: ['', []],
      linkedinFC: ['', []],
      nameFC: ['', [Validators.required]],
      phoneFA: this.formBuilder.array([]),
      portfolioFC: ['', []],
      titleFC: [{name: ''}, []],
      titleNameFC: ['', [this.titlesValidator.confirmTitle('titleFC')]]
    });

    this.setEmails(['']);
    this.setPhones(['']);
  }

  private formUpdate(): void {
    this.form.patchValue({
      agencyFC: this.contact ? this.contact.agency : '',
      cityFC: this.contact ? this.contact.city : '',
      countryFC: this.contact ? this.contact.country : '',
      dobFC: this.contact ? this.contact.dob : null,
      facebookFC: this.contact ? this.contact.facebook : '',
      instagramFC: this.contact ? this.contact.instagram : '',
      linkedinFC: this.contact ? this.contact.linkedin : '',
      nameFC: this.contact ? this.contact.name : '',
      portfolioFC: this.contact ? this.contact.portfolio : '',
      titleFC: this.contact ? this.contact.title : {name: ''},
      titleNameFC: this.contact && this.contact.title ? this.contact.title.name : '',
    });

    const emails: string[] = this.contact && this.contact.email && this.contact.email.length
      ? this.contact.email : [''];
    const phones: string[] = this.contact && this.contact.phone && this.contact.phone.length
      ? this.contact.phone : [''];

    this.setEmails(emails);
    this.setPhones(phones);

    this.formsService.markFormGroupTouched(this.form);
  }

  public getTitleFC(fg: FormGroup): FormControl {
    return fg.get('titleFC') as FormControl;
  }

  public getTitleNameFC(fg: FormGroup): FormControl {
    return fg.get('titleNameFC') as FormControl;
  }

  private setEmails(emails: string[] = []): void {
    const formControls = emails.map((email: string) => this.formBuilder
      .control(email, [Validators.email])
    );

    const formArray = this.formBuilder.array(formControls);
    this.form.setControl('emailFA', formArray);
  }

  private setPhones(phones: string[] = []): void {
    const formControls = phones.map((phone: string) => this.formBuilder
      .control(phone, [])
    );

    const formArray = this.formBuilder.array(formControls);
    this.form.setControl('phoneFA', formArray);
  }

  private titlesSearchSetup() {
    this.titles$ = this.titlesTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.contactService.getConactsTitles({query: term, limit: 5});
      }),
      catchError(error => of<TitleDto[]>([]))
    );
  }
}
