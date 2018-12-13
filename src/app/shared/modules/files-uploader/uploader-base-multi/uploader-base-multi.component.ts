import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FileDto } from '../../../../core/interfaces/file-dto';


@Component({
  selector: 'app-uploader-base-multi',
  templateUrl: './uploader-base-multi.component.html',
  styleUrls: ['./uploader-base-multi.component.scss']
})
export class UploaderBaseMultiComponent implements OnChanges {

  @Input() disabled = false;
  @Input() files: FileDto[];
  @Input() fieRequired = false;
  @Input() fileTypes = '';
  @Input() height: number;
  @Input() title: string;
  @Input() width: number;

  @Output() uploadsChanged = new EventEmitter<FileDto[]>();

  public updatedFiles: FileDto[];

  constructor() { }

  ngOnChanges() {
    this.updatedFiles = this.files ? JSON.parse(JSON.stringify(this.files)) : [];
  }

  onUploaded(file: FileDto) {
    if (!file) { return; }

    this.updatedFiles.push(file);
    this.uploadsChanged.emit(this.updatedFiles);
  }

  onCleared(id: number) {
    const idx = (this.updatedFiles || []).findIndex((f: FileDto) => f.id === id);

    if (idx !== -1) {
      this.updatedFiles.splice(idx, 1);
      this.uploadsChanged.emit(this.updatedFiles);
    }
  }
}
