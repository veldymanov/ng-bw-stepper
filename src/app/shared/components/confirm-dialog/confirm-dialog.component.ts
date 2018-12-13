import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmDialogInput } from '../../../core/interfaces/confirm-dialog-input';

@Component({
  selector: 'app-confirm-dialod',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInput,
  ) { }

  ngOnInit() {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
