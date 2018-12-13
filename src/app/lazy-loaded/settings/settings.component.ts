import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  styles: [` `],
  template: `
    <mat-tab-group [@.disabled]="true">
      <mat-tab label="Scores">
        <app-awards-settings></app-awards-settings>
      </mat-tab>
      <mat-tab label="Dictionaries">
        <app-dictionaries></app-dictionaries>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class SettingsComponent {

}
