import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FileDto } from '../../../../core/interfaces/file-dto';
import { ResourceType } from '../../../../core/enums/resource-type.enum';


@Component({
  selector: 'app-uploader-dialog',
  styles: [`
    img {
      margin: 0 !important;
      max-height: 85vh;
      max-width: 100%;
      width: 100%;
      object-fit: contain;
    }

    video {
      display: block;
      margin: 0  auto !important;
      max-height: 85vh;
      max-width: 100%;
    }
  `],
  template: `
    <img mat-card-image *ngIf="data.type === ResourceTypeEnum.Image"
        [src]="data.download_url"
        alt="Photo of a Car">

    <video controls *ngIf="data.type === ResourceTypeEnum.Video">
      <source [src]="data.download_url" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `
})
export class UploaderDialogComponent implements OnInit {

  ResourceTypeEnum = ResourceType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FileDto
  ) { }

  ngOnInit() {
  }

}
