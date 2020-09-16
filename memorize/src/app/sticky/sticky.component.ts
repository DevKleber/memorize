import {
	Component,
	OnInit,
	isDevMode,
	Inject,
	ElementRef,
	ViewChild,
} from '@angular/core';
import { StickyService } from './sticky.service';
import { NotificationService } from '../shared/messages/notification.service';
import { Helper } from '../helper';
import { API_SITE_PATH_IMG } from './../app.api';
import {
	faPlus,
	faBars,
	faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { LoaderService } from '../shared/loader/loader.service';

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
	categoryActive: any = {};

	// Icons
	faPlus = faPlus;
	faBars = faBars;
	faPlusCircle = faPlusCircle;

	@ViewChild('closemodalCategoryAdd', { static: true })
	closemodalCategoryAdd: ElementRef;
	@ViewChild('closemodalCategoryPick', { static: true })
	closemodalCategoryPick: ElementRef;
	@ViewChild('closemodalStickyAdd', { static: true })
	closemodalStickyAdd: ElementRef;

	constructor(
		private stickyService: StickyService,
		private formBuilder: FormBuilder,
		public helper: Helper,
		public notificationService: NotificationService,
		public loaderService: LoaderService
	) {}

	ngOnInit() {
		this.getCategories();
		this.initialForms();
	}

	initialForms() {
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
		if (this.categoryActive.id == undefined) {
			return;
		}
		this.loaderService.isLoad(true);
		this.stickyService
			.getSticky(this.categoryActive.id)
			.subscribe((res) => {
				this.stickers = res['dados'];
				this.loaderService.isLoad(false);
			});
	}

	getCategories() {
		this.loaderService.isLoad(true);
		this.stickyService.getCategories().subscribe((res) => {
			this.loaderService.isLoad(false);
			this.categories = res['dados'];
			this.getCategoryActive();
			this.getStickers();
		});
	}

	save(form) {
		this.loaderService.isLoad(true);
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
			this.clearForm();
			this.form.controls['id_categoria'].setValue(form.id_categoria);
			this.getStickers();
			this.closemodalStickyAdd.nativeElement.click();
			this.loaderService.isLoad(false);
		});
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
		this.loaderService.isLoad(true);
		this.stickyService
			.saveCategory(this.formCategory.value)
			.subscribe((res) => {
				if (this.categories.length == 0) {
					this.pickCategory(res['dados']);
				}
				this.notificationService.notifySweet('saved successfully!');
				this.getCategories();
				this.closemodalCategoryAdd.nativeElement.click();
				// this.clearForm();
				this.form.controls['id_categoria'].setValue(res['dados'].id);
				this.loaderService.isLoad(false);
			});
	}

	getCategoryActive() {
		this.categoryActive = localStorage.getItem('memorize_catActive')
			? JSON.parse(localStorage.getItem('memorize_catActive'))
			: {};

		this.form.controls['id_categoria'].setValue(this.categoryActive.id);
		console.log(this.categoryActive.id);
		if (this.categoryActive.id == undefined) {
			this.setCategoryActive(this.categories[0]);
		}
	}

	setCategoryActive(category) {
		this.categoryActive = category;
		localStorage.setItem('memorize_catActive', JSON.stringify(category));
	}

	pickCategory(category) {
		this.loaderService.isLoad(true);
		this.setCategoryActive(category);
		this.getStickers();
		this.closemodalCategoryPick.nativeElement.click();
		this.form.controls['id_categoria'].setValue(category.id);
	}

	clearForm() {
		this.initialForms();
	}
}
