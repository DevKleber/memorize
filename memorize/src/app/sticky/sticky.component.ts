import { Component, OnInit, isDevMode, Inject } from '@angular/core';
import { StickyService } from './sticky.service';
import { Helper } from '../helper';
import { API_SITE_PATH_IMG } from './../app.api';
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
	img: any = 'assets/img/user/padrao.svg';
	selectedFile: File;

	constructor(
		private stickyService: StickyService,
		private formBuilder: FormBuilder,
		public helper: Helper
	) {}

	ngOnInit() {
		this.getStickers();
		this.form = this.formBuilder.group({
			frente: this.formBuilder.control('', [Validators.required]),
			verso: this.formBuilder.control('', [Validators.required]),
			id_categoria: this.formBuilder.control(1, [Validators.required]),
			imagem: this.formBuilder.control(''),
		});
	}
	getStickers() {
		this.stickyService.getSticky().subscribe((res) => {
			this.stickers = res['dados'];
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
			console.log(data);
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
}
