import {
  Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { FileUploader } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';
import { isObject } from 'lodash';

import { FileDto } from '../../../../core/interfaces/file-dto';
import { ResourceType } from '../../../../core/enums/resource-type.enum';

import { HttpService } from '../../../../core/services/http.service';
import { UploaderDialogComponent } from '../uploader-dialog/uploader-dialog.component';


@Component({
  selector: 'app-uploader-base',
  templateUrl: './uploader-base.component.html',
  styleUrls: ['./uploader-base.component.scss']
})
export class UploaderBaseComponent implements OnChanges {

  @ViewChild('uploadElement') uploadElement: ElementRef;

  @Input() disabled = false;
  @Input()
    set file(value: FileDto) {
      this._file = value;

      if (
        !this._file || !this._file.public_id || !this._file.url || !this._file.thumb_url
      ) { return; }

      this.isEmptyUploader = false;
      this.defineFileType();
    }
    get file() {
      return this._file;
    }
  @Input() fileTypes: string; // 'image/png, image/jpeg, image/jpg, image/webp', image/gif;
  @Input() fieRequired = false;
  @Input() height = 250;
  @Input() width = 250;
  @Input() title: string;

  @Output() uploaded = new EventEmitter<FileDto>();
  @Output() cleared = new EventEmitter<number>();

  public isEmptyUploader = true;
  public isImage: boolean;
  public isLoading = false;
  public isVideo: boolean;
  public isRawFile: boolean;
  public isPdf: boolean;
  public uploader: FileUploader;

  private _file: FileDto;


  constructor(
    private dialog: MatDialog,
    private httpService: HttpService
  ) { }

  ngOnChanges() {
    this.uploader = new FileUploader({
      url: this.httpService.getBaseUrl() + '/files',
      authToken: this.httpService.getToken(),
    });

    this.uploader.onAfterAddingFile = ((item: FileItem) => {
      this.uploadElement.nativeElement.value = '';
    });

    this.uploader.onProgressItem = (item: FileItem, progress) => { };

    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number) => {
      if (!response || (status !== 201)) { return; }

      const data = JSON.parse(response);
      if (isObject(data)) {
        this._file = data;
        this.uploaded.emit(data);
        this.isLoading = false;
      }
    };
  }

  defineFileType() {
    switch (this.file.type) {
      case ResourceType.Image:
        this.isImage = true;
        break;
      case ResourceType.Video:
        this.isVideo = true;
        break;
      case ResourceType.Raw:
        this.isRawFile = true;
        if (this.file.extension === 'pdf') { this.isPdf = true; }
        break;
    }
  }

  disabledCheck(event) {
    if (this.disabled) { event.preventDefault(); }
  }

  onChange($event: any): void {
    this.uploader.uploadAll();
    this.isLoading = true;
  }

  remove() {
    const id = this._file.id;
    this.isImage = false;
    this.isVideo = false;
    this.isRawFile = false;
    this.isPdf = false;
    this._file = null;
    this.isEmptyUploader = true;
    this.cleared.emit(id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploaderDialogComponent, {
      width: '75%',
      data: this.file
    });
  }
}
