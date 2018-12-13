import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {

  @Output() itemAdded = new EventEmitter();
  @Input() itemsCategory: string;
  @ViewChild('itemName') private itemName: ElementRef;

  public name = new FormControl('', [Validators.required]);

  addItem() {
    this.name.markAsTouched();

    if (this.itemName.nativeElement.value) {
      this.itemAdded.emit({name: this.itemName.nativeElement.value});
      this.itemName.nativeElement.value = '';

      this.name = new FormControl('', [Validators.required]);
    }
  }
}
