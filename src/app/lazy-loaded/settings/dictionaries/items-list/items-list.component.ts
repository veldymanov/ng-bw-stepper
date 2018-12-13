import { ConfirmDialogService } from './../../../../core/services/confirm-dialog.service';
import { ConfirmDialogInput } from './../../../../core/interfaces/confirm-dialog-input';
import { BaseDictionaryDto } from './../../../../core/interfaces/base-dictionary-dto';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent {

  @Input() itemsList: BaseDictionaryDto[];
  @Output() itemDeleted = new EventEmitter<number>();

  constructor(
    private confirmDialogService: ConfirmDialogService,
  ) { }

  deleteItem(id, name) {

    const inputDialogData: ConfirmDialogInput = {
      falseBtnName: 'Cancel',
      falseBtnColor: 'primary',
      message: `delete ${name}`,
      trueBtnName: 'Delete',
      trueBtnColor: 'warn'
    };

    this.confirmDialogService.confirm(inputDialogData)
      .subscribe(answer => answer ? this.itemDeleted.emit(id) : false);
  }
}
