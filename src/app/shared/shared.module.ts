import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FilesUploaderModule } from './modules/files-uploader/files-uploader.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
} from '@angular/material';

import { BrandSearchComponent } from './components/brand-search/brand-search.component';
import { ClientCompaniesSearchComponent } from './components/client-company-search/client-company-search.component';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CountrySearchComponent } from './components/country-search/country-search.component';
import { ContactSearchComponent } from './components/contact-search/contact-search.component';
import { TitleSearchComponent } from './components/title-search/title-search.component';


const ANGULAR_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule
];

const SHARED_MODULES = [
  CommonModule,
  FilesUploaderModule,
  ReactiveFormsModule
];

const SHARED_COMPONENTS = [
  BrandSearchComponent,
  CitySearchComponent,
  ClientCompaniesSearchComponent,
  ConfirmDialogComponent,
  ContactSearchComponent,
  CountrySearchComponent,
  TitleSearchComponent,
];

const SHARED_DIRECTIVES = [
];

const SHARED_PIPES = [
];


@NgModule({
  imports: [
    ANGULAR_MATERIAL_MODULES,
    SHARED_MODULES,
  ],
  declarations: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_PIPES,
  ],
  exports: [
    ANGULAR_MATERIAL_MODULES,
    SHARED_MODULES,
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_PIPES
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
