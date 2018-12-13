import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CampaignDto } from '../../../core/interfaces/campaign-dto';
import { ClientCredit } from '../../../core/classes/client-credit';
import { ClientCreditDto } from '../../../core/interfaces/client-credit-dto';

import { CampaignService } from '../../../core/services/campaign.service';
import { FormsService } from '../../../core/services/forms.service';
import { ContactService } from '../../../core/services/contact.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TitlesValidator } from '../../../core/validators/titles.validator';


@Component({
  selector: 'app-campaign-client-credits',
  templateUrl: './campaign-client-credits.component.html',
  styleUrls: ['./campaign-client-credits.component.scss']
})
export class CampaignClientCreditsComponent implements OnInit {

  @Input() private campaign: CampaignDto;
  @Input() public clientCreditsFG: FormGroup;

  public loading: boolean;

  private clientCredits: ClientCreditDto[];

  get clientCreditFA(): FormArray { return this.clientCreditsFG.get('clientCreditFA') as FormArray; }

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder,
    private formsService: FormsService,
    private contactService: ContactService,
    private notificationService: NotificationService,
    private titlesValidator: TitlesValidator
  ) { }

  ngOnInit() {
    this.clientCredits = [new ClientCredit(this.campaign.id, null, null, null)];
    this.setCredits();
    setTimeout(() => this.formUpdate(), 0);
  }

  public cancelChanges(): void {
    this.formUpdate();
    this.clientCreditsFG.markAsPristine();
  }

  public controlRemove(fa: FormArray, index: number): void {
    fa.removeAt(index);
    fa.markAsDirty();
  }

  public controlAdd(fa: FormArray): void {
    fa.push(this.fb.group({
      clientCreditContactFC: [{name: ''}],
      clientCreditContactNameFC: ['', [Validators.required]],
      clientCreditTitleFC: [{name: ''}, []],
      clientCreditTitleNameFC: ['', [Validators.required, this.titlesValidator.confirmTitle('clientCreditTitleFC')]],
    }));

    this.formsService.markFormGroupTouched(fa);
    setTimeout(() => fa.markAsDirty(), 50);
  }

  public formSubmit(): void {
    this.loading = true;
    const payload: ClientCreditDto[] = [];

    this.clientCreditFA.value.forEach(control => {
      const credit: ClientCreditDto = {
        campaign_id: this.campaign.id,
        contact: control.clientCreditContactFC
          ? control.clientCreditContactFC
          : {name: control.clientCreditContactNameFC},
        id: undefined,
        title: control.clientCreditTitleFC
          ? control.clientCreditTitleFC
          : undefined,
      };

      payload.push(credit);
    });

    this.campaignService.createOrUpdateCampaignClientCredits(this.campaign.id, payload)
      .subscribe(
        (campaign: CampaignDto) => {
          this.campaign.client_credits = campaign.client_credits;
          this.clientCreditsFG.markAsPristine();
          this.notificationService.success('Saved', 'Campaign');
          this.loading = false;
        },
        (err) => {
          this.clientCreditsFG.markAsDirty();
          this.loading = false;
        }
      );
  }

  public getCreditContactFC(fg: FormGroup): FormControl {
    return fg.get('clientCreditContactFC') as FormControl;
  }

  public getCreditContactNameFC(fg: FormGroup): FormControl {
    return fg.get('clientCreditContactNameFC') as FormControl;
  }

  public getCreditTitleFC(fg: FormGroup): FormControl {
    return fg.get('clientCreditTitleFC') as FormControl;
  }

  public getCreditTitleNameFC(fg: FormGroup): FormControl {
    return fg.get('clientCreditTitleNameFC') as FormControl;
  }

  private formUpdate(): void {
    this.setCreditsControls(this.clientCredits, 'clientCreditFA');
    this.formsService.markFormGroupTouched(this.clientCreditsFG);
  }

  private setCredits(): void {
    if (!!this.campaign.client_credits.length) {
      this.clientCredits = this.campaign.client_credits;
    }
  }

  private setCreditsControls(
    values: ClientCreditDto[],
    faName: string,
    fg: FormGroup = this.clientCreditsFG
  ): void {
    const formGroups = values.map((value: ClientCreditDto) => {
      return this.fb.group({
        clientCreditContactFC: [value.contact ? value.contact : {name: ''}],
        clientCreditContactNameFC: [value.contact ? value.contact.name : '', []],
        clientCreditTitleFC: [value.title ? value.title : {name: ''}, []],
        clientCreditTitleNameFC: [
          value.title ? value.title.name : '',
          [Validators.required, this.titlesValidator.confirmTitle('clientCreditTitleFC')]
        ],
      });
    });

    const formArray = this.fb.array(formGroups);
    fg.setControl(faName, formArray);
  }
}
