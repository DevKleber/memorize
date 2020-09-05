import { Component, OnInit, isDevMode, Inject } from '@angular/core';
import { StickyService } from './sticky.service';
import { API_SITE_PATH_IMG } from './../app.api';
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
	selector: 'app-sticky',
	templateUrl: './sticky.component.html',
	styleUrls: ['./sticky.component.css'],
})
export class StickyComponent implements OnInit {
	stickers: any[] = [];
	path: string = API_SITE_PATH_IMG;
	isDevMode: boolean = isDevMode();

	constructor(
		private stickyService: StickyService,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.getStickers();
	}
	getStickers() {
		this.stickyService.getSticky().subscribe((res) => {
			this.stickers = res['dados'];
		});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
			width: '600px',
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}
}

@Component({
	selector: 'add',
	templateUrl: 'add.html',
	styleUrls: ['./add.component.css'],
})
export class DialogOverviewExampleDialog {
	constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
