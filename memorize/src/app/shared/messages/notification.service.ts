import { EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

export class NotificationService {
	constructor() {}

	notifier = new EventEmitter<string>();

	notifySweet(message: string) {
		swal.fire({
			title: `${message}`,
		});
	}
	notifyError(message: string) {
		swal.fire({
			title: `${message}`,
			timer: 4500,
		});
		// swal.fire({
		// 	position: 'top',
		// 	type: 'error',
		// 	title: `${message}`,
		// 	showConfirmButton: false,
		// 	timer: 4500,
		// });
	}
	notifyAlert(message: string) {
		swal.fire({
			title: `${message}`,
			timer: 1500,
		});
		// swal.fire({
		// 	position: 'top',
		// 	type: 'warning',
		// 	title: `${message}`,
		// 	showConfirmButton: false,
		// 	timer: 1500,
		// });
	}
}
