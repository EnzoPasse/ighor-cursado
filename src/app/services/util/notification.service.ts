import { Injectable } from '@angular/core';
import { Predicate } from './../../components/shared/interfaces/interfaces'

declare var alertify: any;

@Injectable()
export class NotificationService {
  private _notifier: any = alertify;

  constructor() { }

  /*
  Opens a confirmation dialog using the alertify.js lib
  */
  openConfirmationDialog(message: string, okCallback: () => any) {
    this._notifier.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    }).setHeader('<span class="fa fa-warning fa-2x" style="vertical-align:middle;color:#FFA500;"></span> Alerta ').
       set({transition:'slide'});
  }

  /*
  Prints a success message using the alertify.js lib
  */
  printSuccessMessage(message: string) {
    this._notifier.success(message);
  }

  /*
  Prints an error message using the alertify.js lib
  */
  printErrorMessage(message: string) {

    this._notifier.alert(message)
                  .set({transition:'slide'})
                  .setHeader('<span class="fa fa-times-circle fa-2x" style="vertical-align:middle;color:#e10000;"></span> Error ');


      //  this._notifier.error(message,0);
  }
}
