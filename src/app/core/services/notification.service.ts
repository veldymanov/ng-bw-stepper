import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  success(message: string, title = '') {
    this.toastr.success(message, title);
  }

  error(message, title = '') {
    this.toastr.error(message, title);
  }

  warning(message, title = '') {
    this.toastr.warning(message, title);
  }
}
