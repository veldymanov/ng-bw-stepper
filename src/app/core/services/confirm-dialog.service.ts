import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';

import { ConfirmDialogInput } from '../interfaces/confirm-dialog-input';

import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private confirmSubj$ = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
  ) { }

  confirm(inputData: ConfirmDialogInput): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: inputData
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.confirmSubj$.next(result);
    });

    return this.confirmSubj$.asObservable();
  }

}
