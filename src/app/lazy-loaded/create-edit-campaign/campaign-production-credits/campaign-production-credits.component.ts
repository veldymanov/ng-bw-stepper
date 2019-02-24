import { Component, Input,  OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CampaignDto } from '../../../core/interfaces/campaign-dto';
import { ContactFAsNames } from './production-credit-sub-form/production-credit-sub-form.component';
import { ProductionCredit } from '../../../core/classes/production-credit';
import { ProductionCreditDto } from '../../../core/interfaces/production-credit-dto';
import { ProductionCreditContactDto } from '../../../core/interfaces/production-credit-contact-dto';
import { ProductionCreditsDto } from '../../../core/interfaces/production-credits-dto';
import { ProductionCreditType } from '../../../core/enums/production-credit-type.enum';

import { CampaignService } from '../../../core/services/campaign.service';
import { FormsService } from '../../../core/services/forms.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-campaign-production-credits',
  templateUrl: './campaign-production-credits.component.html',
  styleUrls: ['./campaign-production-credits.component.scss']
})
export class CampaignProductionCreditsComponent implements OnInit {

  @Input() private campaign: CampaignDto;
  @Input() form: FormGroup;

  public loading: boolean;

  private audioProductionCredits: ProductionCreditDto[] = [
    new ProductionCredit('', null, '', null, '', ProductionCreditType.AudioProduction)
  ];
  private digitalProductionCredits: ProductionCreditDto[] = [
    new ProductionCredit('', null, '', null, '', ProductionCreditType.DigitalProduction)
  ];
  private filmProductionCredits: ProductionCreditDto[] = [
    new ProductionCredit('', null, '', null, '', ProductionCreditType.FilmProduction)
  ];
  private photoProductionCredits: ProductionCreditDto[] = [
    new ProductionCredit('', null, '', null, '', ProductionCreditType.PhotoProduction)
  ];
  private postProductionCredits: ProductionCreditDto[] = [
    new ProductionCredit('', null, '', null, '', ProductionCreditType.PostProduction)
  ];

  get audioProductionCreditsFA(): FormArray { return this.form.get('audioProductionCreditsFA') as FormArray; }
  get digitalProductionCreditsFA(): FormArray { return this.form.get('digitalProductionCreditsFA') as FormArray; }
  get filmProductionCreditsFA(): FormArray { return this.form.get('filmProductionCreditsFA') as FormArray; }
  get photoProductionCreditsFA(): FormArray { return this.form.get('photoProductionCreditsFA') as FormArray; }
  get postProductionCreditsFA(): FormArray { return this.form.get('postProductionCreditsFA') as FormArray; }

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder,
    private formsService: FormsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    console.log(this.campaign);
    this.setValuesForControls();
    setTimeout(() => this.formUpdate(), 0);
  }

  public cancelChanges(): void {
    this.formUpdate();
    this.form.markAsPristine();
  }

  public controlAdd(fa: FormArray): void {
    fa.push(this.fb.group({
      city: [{value: '', disabled: true}, [Validators.required]],
      contacts: this.fb.array([]),
      country: [{value: '', disabled: true}, [Validators.required]],
      id: [null, []],
      name: ['', [Validators.required]],
      type: [fa.value[0].type, []],
    }));

    fa.markAsDirty();
    this.formsService.markFormGroupTouched(fa);
  }

  public controlRemove(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
    this.form.markAsDirty();
  }

  public formSubmit(): void {
    this.loading = true;
    const productionCredits: ProductionCreditDto[] = [];
    console.log(this.form.value);

    Object.keys(this.form.controls).forEach((key: string) => {
      this.form.get(key).value.forEach(control => {
        const creditContacts: ProductionCreditContactDto[] = [];

        if (control.name) {
          ContactFAsNames.forEach((ContactFAName: string) => {
            if (control[ContactFAName] && control[ContactFAName].length) {
              control[ContactFAName].forEach(contact => {
                if (contact.name) {
                  const creditContact: ProductionCreditContactDto = {
                    contact: contact.contact,
                    id: contact.id ? contact.id : undefined,
                    name: contact.name,
                    title: contact.title,
                  };

                  creditContacts.push(creditContact);
                }
              });
            }
          });

          const credit: ProductionCreditDto = {
            city: control.city ? control.city : undefined,
            contacts: creditContacts,
            country: control.country ? control.country : undefined,
            id: control.id ? control.id : undefined,
            name: control.name ? control.name : undefined,
            type: control.type
          };

          productionCredits.push(credit);
        }
      });
    });

    const payload: ProductionCreditsDto = {
      campaign_id: this.campaign.id,
      production_credits: productionCredits
    };

    this.campaignService.createOrUpdateCampaignProductionCredits(payload)
      .subscribe(
        (campaign: CampaignDto) => {
          this.campaign.production_credits = campaign.production_credits;

          this.form.markAsPristine();
          this.notificationService.success('Saved', 'Campaign');
          this.loading = false;
        },
        (err) => {
          this.form.markAsDirty();
          this.loading = false;
        }
      );
  }

  private formUpdate(): void {
    this.setControls(this.audioProductionCredits, 'audioProductionCreditsFA');
    this.setControls(this.digitalProductionCredits, 'digitalProductionCreditsFA');
    this.setControls(this.filmProductionCredits, 'filmProductionCreditsFA');
    this.setControls(this.photoProductionCredits, 'photoProductionCreditsFA');
    this.setControls(this.postProductionCredits, 'postProductionCreditsFA');

    this.formsService.markFormGroupTouched(this.form);
  }

  private setValuesForControls(): void {
    if (!!this.campaign && !!this.campaign.production_credits && this.campaign.production_credits.length) {
      const audioProductionCredits: ProductionCreditDto[] = this.campaign.production_credits
        .filter((credit: ProductionCreditDto) => credit.type === ProductionCreditType.AudioProduction);
      const digitalProductionCredits: ProductionCreditDto[] = this.campaign.production_credits
        .filter((credit: ProductionCreditDto) => credit.type === ProductionCreditType.DigitalProduction);
      const filmProductionCredits: ProductionCreditDto[] = this.campaign.production_credits
        .filter((credit: ProductionCreditDto) => credit.type === ProductionCreditType.FilmProduction);
      const photoProductionCredits: ProductionCreditDto[] = this.campaign.production_credits
        .filter((credit: ProductionCreditDto) => credit.type === ProductionCreditType.PhotoProduction);
      const postProductionCredits: ProductionCreditDto[] = this.campaign.production_credits
        .filter((credit: ProductionCreditDto) => credit.type === ProductionCreditType.PostProduction);

      if (!!audioProductionCredits.length) { this.audioProductionCredits = audioProductionCredits; }
      if (!!digitalProductionCredits.length) { this.digitalProductionCredits = digitalProductionCredits; }
      if (!!filmProductionCredits.length) { this.filmProductionCredits = filmProductionCredits; }
      if (!!photoProductionCredits.length) { this.photoProductionCredits = photoProductionCredits; }
      if (!!postProductionCredits.length) { this.postProductionCredits = postProductionCredits; }
    }
  }

  private setControls(
    values: ProductionCreditDto[],
    faName: string,
    fg: FormGroup = this.form
    ): void {
    const formGroups: FormGroup[] = values.map((value: ProductionCreditDto) => {
      return this.fb.group({
        city: [{value: value.city, disabled: !value.name}, [Validators.required]],
        contacts: this.fb.array([]), // TODO: FormGroup
        contactsRawData: [value.contacts],
        country: [{value: value.country, disabled: !value.name}, [Validators.required]],
        id: [value.id, []],
        name: [value.name, []],
        type: [value.type, []],
      });
    });

    const formArray = this.fb.array(formGroups);
    fg.setControl(faName, formArray);
  }
}
