import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Agency } from '../../../core/classes/agency';
import { AgencyType } from '../../../core/enums/agency-type.enum';
import { AgencyDto } from '../../../core/interfaces/agency-dto';
import { CampaignAgencyDto } from '../../../core/interfaces/campaign-agency-dto';
import { CampaignDto } from '../../../core/interfaces/campaign-dto';
import { CampaignService } from '../../../core/services/campaign.service';
import { FormsService } from '../../../core/services/forms.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CampaignAgencyFormComponent } from '../campaign-agency-form/campaign-agency-form.component';

@Component({
  selector: 'app-campaign-agencies',
  templateUrl: './campaign-agencies.component.html',
  styleUrls: ['./campaign-agencies.component.scss']
})
export class CampaignAgenciesComponent implements OnInit {

  @Input() private campaign: CampaignDto;
  @Input() form: FormGroup;

  @ViewChildren(CampaignAgencyFormComponent) agencyForms: QueryList<CampaignAgencyFormComponent>;

  public loading: boolean;
  public agencyTypes = AgencyType;

  advertisingAgencies: CampaignAgencyDto[] = [this.getDefaultAgency(AgencyType.Advertising)];
  mediaAgencies: CampaignAgencyDto[] = [this.getDefaultAgency(AgencyType.Media)];
  prAgencies: CampaignAgencyDto[] = [this.getDefaultAgency(AgencyType.PR)];

  constructor(
    private campaignService: CampaignService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.formUpdate(this.campaign);
  }

  agencyAdd(event: { type: AgencyType, array: FormArray }) {
    const array = this.getListByType(event.type);
    array.push(this.getDefaultAgency(event.type));
    this.formsService.markFormGroupTouched(event.array);
  }

  removed(agency: CampaignAgencyDto) {
    const array = this.getListByType(agency.agency.type);
    const id = array.indexOf(agency);
    array.splice(id, 1);
  }

  private getDefaultAgency(type: AgencyType) {
    return {
      agency: { type, name: undefined },
      campaign_id: this.campaign && this.campaign.id,
      city: undefined,
      country: undefined,
      network: undefined
    } as CampaignAgencyDto;
  }

  private getListByType(type: AgencyType) {
    switch (type) {
      case AgencyType.Advertising: return this.advertisingAgencies;
      case AgencyType.Media: return this.mediaAgencies;
      case AgencyType.PR: return this.prAgencies;
    }
  }

  public cancelChanges(): void {
    this.formUpdate(this.campaign);
    this.form.markAsPristine();
  }

  ifLastAgencyIsNetwork() {}

  public formSubmit(): void {
    this.loading = true;

    const agencies = this.agencyForms.map(p => p.getAgency()).filter(p => p.agency && (p.agency.name || p.agency.id));
    this.campaignService.createOrUpdateCampaignAgencies(agencies, this.campaign.id)
      .subscribe(
        (campaign: CampaignDto) => {
          this.formUpdate(campaign);
          this.notificationService.success('Saved', 'Campaign');
          this.loading = false;
        },
        (err) => {
          this.form.markAsDirty();
          this.loading = false;
        }
      );
  }

  private formUpdate(campaign: CampaignDto): void {
    this.advertisingAgencies = this.getFormAgencies(campaign, AgencyType.Advertising);
    this.mediaAgencies = this.getFormAgencies(campaign, AgencyType.Media);
    this.prAgencies = this.getFormAgencies(campaign, AgencyType.PR);
    this.form.markAsPristine();
  }

  private getFormAgencies(campaign: CampaignDto, type: AgencyType) {
    const agencies = campaign.agencies.filter(p => p.agency.type === type);
    return agencies.length ? agencies : [this.getDefaultAgency(type)];
  }
}
