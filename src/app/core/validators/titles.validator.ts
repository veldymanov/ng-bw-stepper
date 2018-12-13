import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { TitleDto } from '../interfaces/title-dto';


@Injectable({
  providedIn: 'root'
})
export class TitlesValidator {

  constructor() { }

  confirmTitle(CreditTitleFCKey: string): ValidatorFn {
    return (control: AbstractControl): {[error: string]: boolean} | null => {
      const creditTitleName: string = control.value;
      const creditTitleFC: AbstractControl = control.parent
        ? control.parent.get(CreditTitleFCKey)
        : null;

      return creditTitleFC && creditTitleFC.value.name !== creditTitleName
        ? {'title invalid': true}
        : null;
    };
  }
}
