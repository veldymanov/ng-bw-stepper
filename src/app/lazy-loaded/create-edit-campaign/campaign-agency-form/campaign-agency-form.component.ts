import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { AgencyType } from '../../../core/enums/agency-type.enum';
import { AgencyDto } from '../../../core/interfaces/agency-dto';
import { AgencyService } from '../../../core/services/agency.service';
import { FormsService } from '../../../core/services/forms.service';
import { CampaignAgencyDto } from 'src/app/core/interfaces/campaign-agency-dto';

@Component({
  selector: 'app-campaign-agency-form',
  templateUrl: 'campaign-agency-form.component.html',
  styleUrls: ['./campaign-agency-form.component.scss']
})
export class CampaignAgencyFormComponent implements OnInit, OnDestroy {

  @Input() agency: CampaignAgencyDto;
  @Input() rootForm: FormGroup;
  @Input() arrayName: string;
  @Input() allowAdd: boolean;

  @Output() removed = new EventEmitter<CampaignAgencyDto>();
  @Output() add = new EventEmitter<{ type: AgencyType, array: FormArray }>();

  form: FormGroup;
  agencies$: Observable<AgencyDto[]>;
  agencyTypes = AgencyType;

  private agenciesTermsSubject$ = new Subject<string>();
  formArrayId: number;

  constructor(
    private agencyService: AgencyService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
  ) { }

  get agencyTypeName() {
    switch (this.agency && this.agency.agency.type) {
      case AgencyType.Advertising: return 'Advertising';
      case AgencyType.Media: return 'Media';
      case AgencyType.PR: return 'PR';
    }
  }

  get formArray() {
    return this.rootForm && this.rootForm.get(this.arrayName) as FormArray;
  }

  ngOnInit() {
    if (!this.formArray) {
      this.rootForm.setControl(this.arrayName, this.formBuilder.array([]));
    }
    this.formArrayId = this.formArray.length;
    this.form = this.formBuilder.group({
      agencyFC: [null],
      cityFC: [this.agency && this.agency.city, this.formArrayId ? [Validators.required] : []],
      countryFC: [this.agency && this.agency.country, this.formArrayId ? [Validators.required] : []],
      idFC: [this.agency && this.agency.agency.id],
      isNetworkFC: [!!(this.agency && this.agency.network)],
      nameFC: [this.agency && this.agency.agency.name, this.formArrayId ? [Validators.required] : []],
      networkFC: [this.agency && this.agency.network],
      typeFC: [this.agency && this.agency.agency.type],
    });
    this.formArray.push(this.form);

    this.agenciesSearchSetup();
    setTimeout(() => this.formUpdate(), 0);
  }

  ngOnDestroy() {
    if (this.formArray) {
      this.formArray.removeAt(this.formArrayId);
    }
  }

  remove() {
    this.formArray.removeAt(this.formArrayId);
    this.form.markAsDirty();
    this.removed.emit(this.agency);
  }

  onAdd() {
    this.add.emit({ type: this.agency.agency.type, array: this.formArray });
  }

  agenciesSearch(term: string): void {
    this.agenciesTermsSubject$.next(term);
  }

  patchForm(agency: AgencyDto) {
    this.form.patchValue({
      idFC: agency.id,
      nameFC: agency.name,
    });
  }

  ifFalseNetworkFCToNull(event: MatRadioChange) {
    if (!event.value) { this.form.patchValue({networkFC: null}); }
  }

  agenciesSearchSetup() {
    this.agencies$ = this.agenciesTermsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.agencyService.getAgencies({query: term, limit: 5, type: this.agency.agency.type});
      }),
      catchError(error => of<AgencyDto[]>([]))
    );
  }

  private formUpdate(): void {
    this.formsService.markFormGroupTouched(this.formArray);
  }

  getAgency() {
    const agencyForm: any = this.form.value;
    const agencyObj: CampaignAgencyDto = {
      agency: { name: agencyForm.nameFC, type: agencyForm.typeFC, id: agencyForm.idFC },
      city: agencyForm.cityFC,
      country: agencyForm.countryFC,
      network: agencyForm.networkFC || undefined,
    };
    return agencyObj;
  }
}
