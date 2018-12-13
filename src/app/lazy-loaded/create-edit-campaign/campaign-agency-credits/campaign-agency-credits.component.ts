import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AgencyCredit } from '../../../core/classes/agency-credit';
import { CampaignAgencyCreditDto } from '../../../core/interfaces/campaign-agency-credit-dto';
import { CampaignAgencyCreditsDto } from '../../../core/interfaces/campaign-agency-credits-dto';
import { CampaignDto } from '../../../core/interfaces/campaign-dto';
import { ContactDto } from '../../../core/interfaces/contact-dto';

import { CampaignService } from '../../../core/services/campaign.service';
import { FormsService } from '../../../core/services/forms.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TitlesValidator } from '../../../core/validators/titles.validator';

@Component({
  selector: 'app-campaign-agency-credits',
  templateUrl: './campaign-agency-credits.component.html',
  styleUrls: ['./campaign-agency-credits.component.scss']
})
export class CampaignAgencyCreditsComponent implements OnInit {

  @Input() private campaign: CampaignDto;
  @Input() public agencyCreditsFG: FormGroup;

  public loading: boolean;

  private agencyCredits: CampaignAgencyCreditDto[];

  get agencyCreditFA(): FormArray { return this.agencyCreditsFG.get('agencyCreditFA') as FormArray; }

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder,
    private formsService: FormsService,
    private notificationService: NotificationService,
    private titlesValidator: TitlesValidator
  ) { }

  ngOnInit() {
    this.agencyCredits = [new AgencyCredit({name: ''} as ContactDto, null)];
    this.setCredits();
    setTimeout(() => this.formUpdate(), 0);
  }

  public cancelChanges(): void {
    this.formUpdate();
    this.agencyCreditsFG.markAsPristine();
  }

  public controlAdd(fa: FormArray): void {
    fa.push(this.fb.group({
      agencyCreditContactFC: [{name: ''}],
      agencyCreditContactNameFC: ['', [Validators.required]],
      agencyCreditTitleFC: [{name: ''}, []],
      agencyCreditTitleNameFC: ['', [Validators.required, this.titlesValidator.confirmTitle('agencyCreditTitleFC')]]
    }));

    this.formsService.markFormGroupTouched(fa);
    setTimeout(() => fa.markAsDirty(), 50);
  }

  public controlRemove(fa: FormArray, index: number): void {
    fa.removeAt(index);
    fa.markAsDirty();
  }

  public formSubmit(): void {
    this.loading = true;
    const agencyCredits: CampaignAgencyCreditDto[] = [];

    this.agencyCreditFA.value.forEach(control => {
      const credit: CampaignAgencyCreditDto = {
        contact: control.agencyCreditContactFC
          ? control.agencyCreditContactFC
          : {name: control.agencyCreditContactNameFC},
        title: control.agencyCreditTitleFC
          ? control.agencyCreditTitleFC
          : undefined,
      };

      agencyCredits.push(credit);
    });

    const payload: CampaignAgencyCreditsDto = {
      campaign_id: this.campaign.id,
      credits: agencyCredits
    };

    this.campaignService.createOrUpdateCampaignAgencyCredits(payload)
      .subscribe(
        (campaign: CampaignDto) => {
          this.campaign.agency_credits = campaign.agency_credits;

          this.agencyCreditsFG.markAsPristine();
          this.notificationService.success('Saved', 'Campaign');
          this.loading = false;
        },
        (err) => {
          this.agencyCreditsFG.markAsDirty();
          this.loading = false;
        }
      );
  }

  public getCreditContactFC(fg: FormGroup): FormControl {
    return fg.get('agencyCreditContactFC') as FormControl;
  }

  public getCreditContactNameFC(fg: FormGroup): FormControl {
    return fg.get('agencyCreditContactNameFC') as FormControl;
  }

  public getCreditTitleFC(fg: FormGroup): FormControl {
    return fg.get('agencyCreditTitleFC') as FormControl;
  }

  public getCreditTitleNameFC(fg: FormGroup): FormControl {
    return fg.get('agencyCreditTitleNameFC') as FormControl;
  }

  private formUpdate(): void {
    this.setCreditsControls(this.agencyCredits, 'agencyCreditFA');
    this.formsService.markFormGroupTouched(this.agencyCreditsFG);
  }

  private setCredits(): void {
    if (!!this.campaign.agency_credits.length) {
      this.agencyCredits = this.campaign.agency_credits;
    }
  }

  private setCreditsControls(
    values: CampaignAgencyCreditDto[],
    faName: string,
    fg: FormGroup = this.agencyCreditsFG
  ): void {
    const formGroups = values.map((value: CampaignAgencyCreditDto) => {
      return this.fb.group({
        agencyCreditContactFC: [value.contact ? value.contact : {name: ''}],
        agencyCreditContactNameFC: [value.contact ? value.contact.name : '', []],
        agencyCreditTitleFC: [value.title ? value.title : {name: ''}, []],
        agencyCreditTitleNameFC: [
          value.title ? value.title.name : '',
          [Validators.required, this.titlesValidator.confirmTitle('agencyCreditTitleFC')]
        ]
      });
    });

    const formArray = this.fb.array(formGroups);
    fg.setControl(faName, formArray);
  }
}
