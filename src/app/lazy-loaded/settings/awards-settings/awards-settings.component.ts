import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AwardDto } from './../../../core/interfaces/award-dto';

import { AwardService } from './../../../core/services/award.service';
import { NotificationService } from './../../../core/services/notification.service';

@Component({
  selector: 'app-awards-settings',
  templateUrl: './awards-settings.component.html',
  styleUrls: ['./awards-settings.component.scss']
})
export class AwardsSettingsComponent implements OnInit {

  public form: FormGroup;
  public loading = true;

  private awards: AwardDto[];

  get awardFA(): FormArray {
    return this.form.get('awardFA') as FormArray;
  }

  constructor(
    private awardService: AwardService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.formCreate();

    this.awardService.getAwards()
      .subscribe(
        (resp: AwardDto[]) => {
          this.awards = resp;
          this.formUpdate();
          this.loading = false;
        },
        err => this.loading = false
      );
  }

  public formSubmit(): void {
    this.loading = true;
    this.form.markAsPristine();

    const payload: AwardDto[] = this.awardFA.value
      .map(award => {
        const awardItem: AwardDto = {
          id: award.awardIdFC,
          bronze_value: award.bronzeValueFC,
          gold_value: award.goldValueFC,
          grand_prix_value: award.grandPrixValueFC,
          name: award.nameFC,
          silver_value: award.silverValueFC
        };

        return awardItem;
      });

    this.awardService.saveAwards(payload)
      .subscribe(
        (resp: AwardDto[]) => {
          this.notificationService.success('Saved', 'Settings');
          this.loading = false;
        },
        (err) => {
          this.form.markAsDirty();
          this.loading = false;
        }
      );
  }

  private formCreate(): void {
    this.form = this.formBuilder.group({
      awardFA: this.formBuilder.array([]),
    });
  }

  private formUpdate(): void {
    if (this.awards && this.awards.length) {
      this.setAwards(this.awards);
    }
  }

  private setAwards(awards: AwardDto[]): void {
    const awardsFGs = awards.map((award: AwardDto) => this.formBuilder.group({
      awardIdFC: [award.id],
      bronzeValueFC: [award.bronze_value, [Validators.required, Validators.min(0)]],
      goldValueFC: [award.gold_value, [Validators.required, Validators.min(0)]],
      grandPrixValueFC: [award.grand_prix_value, [Validators.required, Validators.min(0)]],
      nameFC: [award.name],
      silverValueFC: [award.silver_value, [Validators.required, Validators.min(0)]],
    }));

    const awardsFormArray = this.formBuilder.array(awardsFGs);
    this.form.setControl('awardFA', awardsFormArray);
  }
}
