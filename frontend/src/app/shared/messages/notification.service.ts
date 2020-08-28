import { EventEmitter } from "@angular/core";
import swal from 'sweetalert2';

export class NotificationService{
    constructor(  ) { }

    notifier = new EventEmitter<string>()


    notifySweet(message:string){
        swal.fire({
            position: 'top',
            type: 'success',
            title: `${message}`,
            showConfirmButton: false,
            timer: 1500
          })
    }
    notifyError(message:string){
        swal.fire({
            position: 'top',
            type: 'error',
            title: `${message}`,
            showConfirmButton: false,
            timer: 4500
          })
    }
    notifyAlert(message:string){
        swal.fire({
            position: 'top',
            type: 'warning',
            title: `${message}`,
            showConfirmButton: false,
            timer: 1500
          })
    }
}
