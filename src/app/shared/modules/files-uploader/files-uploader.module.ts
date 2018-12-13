import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatDividerModule, MatIconModule, MatInputModule,
  MatMenuModule, MatProgressSpinnerModule,
} from '@angular/material';

import { UploaderBaseComponent } from './uploader-base/uploader-base.component';
import { UploaderBaseMultiComponent } from './uploader-base-multi/uploader-base-multi.component';
import { UploaderDialogComponent } from './uploader-dialog/uploader-dialog.component';

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatCardModule, MatDialogModule,
  MatDividerModule, MatIconModule, MatInputModule,
  MatMenuModule, MatProgressSpinnerModule,
];

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    ANGULAR_MATERIAL_MODULES,
  ],
  declarations: [
    UploaderBaseComponent,
    UploaderBaseMultiComponent,
    UploaderDialogComponent,
  ],
  entryComponents: [
    UploaderDialogComponent,
  ],
  exports: [
    UploaderBaseComponent,
    UploaderBaseMultiComponent,
    UploaderDialogComponent,
  ]
})
export class FilesUploaderModule { }
