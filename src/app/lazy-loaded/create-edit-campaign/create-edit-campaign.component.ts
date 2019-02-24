import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatStepper } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { CampaignDto } from '../../core/interfaces/campaign-dto';
import { CanComponentDeactivate } from '../../core/guards/can-deactivate.guard';
import { ConfirmDialogInput } from '../../core/interfaces/confirm-dialog-input';

import { CampaignService } from '../../core/services/campaign.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';


@Component({
  selector: 'app-create-edit-campaign',
  templateUrl: './create-edit-campaign.component.html',
  styleUrls: ['./create-edit-campaign.component.scss']
})
export class CreateEditCampaignComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  @ViewChild('stepper') stepper: MatStepper;

  public agenciesForm: FormGroup;
  public agencyCreditsForm: FormGroup;
  public campaign: CampaignDto;
  public campaignBaseForm: FormGroup;
  public campaignId: number;
  public campaignIsNew = true;
  public clientCreditsForm: FormGroup;
  public loading = true;
  public stepperIndex = 0;
  public productionCreditsForm: FormGroup;

  public carYears = [2017, 2018];

  private activatedRoutSubs: Subscription;

  get allFormsAreValidAndPristine(): boolean {
    return true;
    // return this.campaignBaseForm.valid && this.campaignBaseForm.pristine
    //   && this.agenciesForm.valid && this.agenciesForm.pristine
    //   && this.agencyCreditsForm.valid && this.agencyCreditsForm.pristine
    //   && this.clientCreditsForm.valid && this.clientCreditsForm.pristine
    //   && this.productionCreditsForm.valid && this.productionCreditsForm.pristine;
  }
  get agencyCreditsFG(): FormGroup { return this.agencyCreditsForm.get('agencyCreditsFG') as FormGroup; }
  get clientCreditsFG(): FormGroup { return this.clientCreditsForm.get('clientCreditsFG') as FormGroup; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private confirmDialogService: ConfirmDialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoutSubs = this.activatedRoute.queryParamMap
      .subscribe((params: ParamMap) => {
        this.campaignId = params.get('campaignId') ? +params.get('campaignId') : null;
        this.stepperIndex = params.get('stepperIndex') ? +params.get('stepperIndex') : 0;

        this.campaignId || this.campaignId === 0
          ? this.fetchCampaign(this.campaignId)
          : this.loading = false;
      });

    this.formsCreate();
  }

  ngOnDestroy(): void {
    this.activatedRoutSubs.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.allFormsAreValidAndPristine) {
      return true;
    }

    const inputDialogData: ConfirmDialogInput = {
      falseBtnName: 'Stay',
      falseBtnColor: 'primary',
      message: 'leave without saving',
      trueBtnName: 'Leave',
      trueBtnColor: 'warn'
    };

    return this.confirmDialogService.confirm(inputDialogData);
  }

  public newCampaignCreated(event: CampaignDto) {
    this.campaign = event;
    this.campaignIsNew = false;
  }

  private fetchCampaign(campaignId: number) {
    this.campaignService.getCampaing(campaignId)
      .subscribe(
        (campaign: CampaignDto) => {
          this.campaign = campaign;
          this.campaignIsNew = false;
          this.loading = false;
        },
        (err) => this.loading = false
      );
  }

  private formsCreate(): void {
    this.campaignBaseForm = this.fb.group({
      awardFA: this.fb.array([]),
      brandFC: ['', [Validators.required]],
      clientCompanyFC: ['', [Validators.required]],
      campaignIdFC: null,
      titleFC: ['', [Validators.required]],
      yearFC: [null, [Validators.required]],
    });

    this.agenciesForm = this.fb.group({
      advertisingFA: this.fb.array([]),
      mediaFA: this.fb.array([]),
      prFA: this.fb.array([])
    });

    this.agencyCreditsForm = this.fb.group({
      agencyCreditsFG: this.fb.group({
        agencyCreditFA: this.fb.array([])
      })
    });

    this.clientCreditsForm = this.fb.group({
      clientCreditsFG: this.fb.group({
        clientCreditFA: this.fb.array([])
      })
    });

    this.productionCreditsForm = this.fb.group({
      audioProductionCreditsFA: this.fb.array([]),
      digitalProductionCreditsFA: this.fb.array([]),
      filmProductionCreditsFA: this.fb.array([]),
      photoProductionCreditsFA: this.fb.array([]),
      postProductionCreditsFA: this.fb.array([]),
    });
  }
}
