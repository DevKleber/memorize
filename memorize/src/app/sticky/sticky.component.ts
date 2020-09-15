import { Component, OnInit, isDevMode, Inject } from '@angular/core';
import { StickyService } from './sticky.service';
import { NotificationService } from '../shared/messages/notification.service';
import { Helper } from '../helper';
import { API_SITE_PATH_IMG } from './../app.api';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-sticky',
	templateUrl: './sticky.component.html',
	styleUrls: ['./sticky.component.css'],
})
export class StickyComponent implements OnInit {
	stickers: any[] = [];
	path: string = API_SITE_PATH_IMG;
	isDevMode: boolean = isDevMode();
	categories: any[] = [];
	form: FormGroup;
	formCategory: FormGroup;
	img: any = 'assets/img/user/padrao.svg';
	selectedFile: File;

	// Icons
	faPlus = faPlus;
	faBars = faBars;

	constructor(
		private stickyService: StickyService,
		private formBuilder: FormBuilder,
		public helper: Helper,
		public notificationService: NotificationService
	) {}

	ngOnInit() {
		this.getStickers();
		this.getCategories();
		this.form = this.formBuilder.group({
			frente: this.formBuilder.control('', [Validators.required]),
			verso: this.formBuilder.control('', [Validators.required]),
			id_categoria: this.formBuilder.control(1, [Validators.required]),
			imagem: this.formBuilder.control(''),
		});
		this.formCategory = this.formBuilder.group({
			categoria: this.formBuilder.control('', [Validators.required]),
		});
	}
	getStickers() {
		this.stickyService.getSticky().subscribe((res) => {
			this.stickers = res['dados'];
		});
	}

	getCategories() {
		this.stickyService.getCategories().subscribe((res) => {
			this.categories = res['dados'];
		});
	}

	save(form) {
		const uploadData = new FormData();
		if (this.selectedFile) {
			uploadData.append(
				'imagem',
				this.selectedFile,
				this.selectedFile.name
			);
		}
		this.uploadFile(form, uploadData);
	}
	uploadFile(form, uploadData) {
		if (uploadData) {
			this.stickyService.file(uploadData).subscribe((data) => {
				form.imagem = data.dados;
				this.saveForm(form);
			});
		} else {
			this.saveForm(form);
		}
	}

	saveForm(form) {
		this.stickyService.save(form).subscribe((data) => {
			this.notificationService.notifySweet('saved successfully!');
		});
		this.getStickers();
	}

	onFileChanged(event) {
		const file: any = this.helper.onFileChanged(event);
		if (!file) {
			alert('Arquivo não permitido');
			return;
		}
		this.img = file.img;
		this.selectedFile = file.selectedFile;
	}
	saveCategory() {
		this.stickyService
			.saveCategory(this.formCategory.value)
			.subscribe((res) => {
				this.notificationService.notifySweet('saved successfully!');
				this.getCategories();
			});
	}
}
