import { Component, OnInit, isDevMode } from '@angular/core';
import { StickyService } from './sticky.service';
import { API_SITE_PATH_IMG } from './../app.api';

@Component({
	selector: 'app-sticky',
	templateUrl: './sticky.component.html',
	styleUrls: ['./sticky.component.css'],
})
export class StickyComponent implements OnInit {
	stickers: any[] = [];
	path: string = API_SITE_PATH_IMG;
	isDevMode: boolean = isDevMode();

	constructor(private stickyService: StickyService) {}

	ngOnInit() {
		this.getStickers();
	}
	getStickers() {
		this.stickyService.getSticky().subscribe((res) => {
			this.stickers = res['dados'];
		});
	}
}
