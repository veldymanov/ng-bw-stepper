import { Injectable } from '@angular/core';
import { FormArray, FormGroup  } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  public markFormGroupTouched(formGroup: FormGroup | FormArray) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  public formGroupEnable(formGroup: FormGroup, notTouchableFCs: string[] = []) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      if (notTouchableFCs.includes(key)) {
        return;
      } else {
        const control = formGroup.get(key) as any;
        control.enable();

        if (control.controls) {
          this.formGroupEnable(control, notTouchableFCs);
        }
      }
    });
  }

  public formGroupDisable(formGroup: FormGroup, notTouchableFCs: string[] = []) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      if (notTouchableFCs.includes(key)) {
        return;
      } else {
        const control = formGroup.get(key) as any;
        control.disable();

        if (control.controls) {
          this.formGroupDisable(control, notTouchableFCs);
        }
      }
    });
  }
}
