import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AwardDto } from '../../../core/interfaces/award-dto';
import { CampaignDto } from '../../../core/interfaces/campaign-dto';
import { CampaignBaseDto } from '../../../core/interfaces/campaign-base-dto';
import { CampaignAwardDto } from '../../../core/interfaces/campaign-award-dto';

import { AwardService } from '../../../core/services/award.service';
import { FormsService } from '../../../core/services/forms.service';
import { CampaignService } from '../../../core/services/campaign.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-campaign-base',
  templateUrl: './campaign-base.component.html',
  styleUrls: ['./campaign-base.component.scss']
})
export class CampaignBaseComponent implements OnChanges, OnInit {

  @Input() private campaign: CampaignDto;
  @Input() form: FormGroup;
  @Output() campaignBaseCreated = new EventEmitter<CampaignDto>();

  public loading = true;

  private awards: AwardDto[];

  get awardFA(): FormArray { return this.form.get('awardFA') as FormArray; }

  constructor(
    private awardService: AwardService,
    private campaignService: CampaignService,
    private fb: FormBuilder,
    private formsService: FormsService,
    private notificationService: NotificationService,
   ) { }

  ngOnChanges(): void {
    if (this.campaign && this.awards) { this.formUpdate(); }
  }

  ngOnInit(): void {
    this.awardService.getAwards()
      .subscribe(
        (awards: AwardDto[]) => {
          this.awards = awards;
          this.formUpdate();
          this.loading = false;
        },
        err => this.loading = false
      );
  }

  public awardChecked(fg: FormGroup, fcName: string) {
    fg.value[fcName]
     ? this.formsService.formGroupEnable(fg, ['isCheckedFC', 'nameFC'])
     : this.formsService.formGroupDisable(fg, ['isCheckedFC', 'nameFC']);
  }

  public cancelChanges(): void {
    this.formUpdate();
    this.form.markAsPristine();
  }

  public formSubmit(): void {
    this.loading = true;

    const campaignAwards: CampaignAwardDto[] = this.awardFA.value
      .filter(award => award.isCheckedFC)
      .map(award => {
        const campaignAward: CampaignAwardDto = {
          award: award.awardFC,
          award_id: award.awardIdFC ? award.awardIdFC : undefined,
          bronze: award.bronzeValueFC,
          id: award.campaignIdFC ? award.campaignIdFC : undefined,
          gold: award.goldValueFC,
          grand_prix: award.grandPrixValueFC,
          silver: award.silverValueFC
        };

        return campaignAward;
      });

    const payload: CampaignBaseDto = {
      awards: campaignAwards,
      brand: this.form.value.brandFC.id ? this.form.value.brandFC : { name: this.form.value.brandFC },
      client_company: this.form.value.clientCompanyFC.id ? this.form.value.clientCompanyFC : { name: this.form.value.clientCompanyFC },
      id: this.form.value.campaignIdFC ? this.form.value.campaignIdFC : undefined,
      name: this.form.value.titleFC,
      year: this.form.value.yearFC,
    };

    this.campaignService.createOrUpdateCampaignBase(payload)
      .subscribe(
        (campaign: CampaignDto) => {
          if (this.campaign) {
            this.campaign.awards = campaign.awards;
            this.campaign.brand = campaign.brand;
            this.campaign.client_company = campaign.client_company;
            this.campaign.name = campaign.name;
            this.campaign.year = campaign.year;
          } else {
            this.campaignBaseCreated.emit(campaign);
          }

          this.notificationService.success('Saved', 'Campaign');
          this.form.markAsPristine();
          this.loading = false;
        },
        (err) => {
          this.form.markAsDirty();
          this.loading = false;
        }
      );
  }

  public isWithoutAwards(): boolean {
    return !this.form.value.awardFA.some(award => award.isCheckedFC);
  }

  private setControls(awards: AwardDto[], campaign: CampaignBaseDto): void {
    const awardsFGs = awards.map((award: AwardDto) => this.fb.group({
      awardFC: [this.awardValueSet(award, campaign, 'award')],
      awardIdFC: [award.id],
      bronzeValueFC: [this.awardValueSet(award, campaign, 'bronze'), [Validators.required, Validators.min(0)]],
      campaignIdFC: [this.awardValueSet(award, campaign, 'id')],
      goldValueFC: [this.awardValueSet(award, campaign, 'gold'), [Validators.required, Validators.min(0)]],
      grandPrixValueFC: [this.awardValueSet(award, campaign, 'grand_prix'), [Validators.required, Validators.min(0)]],
      isCheckedFC: [this.awardCheckedValueSet(award, campaign)],
      nameFC: award.name,
      silverValueFC: [this.awardValueSet(award, campaign, 'silver'), [Validators.required, Validators.min(0)]],
    }));

    const awardsFormArray = this.fb.array(awardsFGs);
    this.form.setControl('awardFA', awardsFormArray);
    this.awardFormGroupDisable();
  }

  private awardCheckedValueSet(award: AwardDto, campaign: CampaignBaseDto): boolean {
    return !campaign
      ? false
      : !!campaign.awards.find((item: CampaignAwardDto) => item.award_id === award.id);
  }

  private awardValueSet(award: AwardDto, campaign: CampaignBaseDto, key: string): number | AwardDto {
    return !!campaign && !!campaign.awards.find((item: CampaignAwardDto) => item.award_id === award.id)
      ? campaign.awards.find((item: CampaignAwardDto) => item.award_id === award.id)[key]
      : null;
  }

  private awardFormGroupDisable() {
    this.awardFA.controls.forEach((control: FormGroup) => {
      if (!control.get('isCheckedFC').value) {
        this.formsService.formGroupDisable(control, ['isCheckedFC', 'nameFC']);
      }
    });
  }

  private formUpdate(): void {
    this.form.patchValue({
      brandFC: this.campaign ? this.campaign.brand : '',
      campaignIdFC: this.campaign ? this.campaign.id : undefined,
      clientCompanyFC: this.campaign ? this.campaign.client_company : '',
      titleFC: this.campaign ? this.campaign.name : '',
      yearFC: this.campaign ? this.campaign.year : null,
    });

    if (this.awards && this.awards.length) {
      this.setControls(this.awards, this.campaign);
    }

    this.formsService.markFormGroupTouched(this.form);
  }
}
