import { Injectable } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class Helper {
	constructor(
		private notificationService: NotificationService,
		private sanitizer: DomSanitizer
	) {}
	typeFile = {
		image: ['jpg', 'png', 'jpeg', 'svg'],
		document: [
			'pdf',
			'msword',
			'vnd.oasis.opendocument.text',
			'vnd.openxmlformats-officedocument.wordprocessingml.document',
			'vnd.ms-excel',
		],
	};

	retira_acentos(string) {
		return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	getTime() {
		var date = new Date();

		var seconds = String(date.getSeconds()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');
		var hour = String(date.getHours()).padStart(2, '0');

		return `${hour}:${minutes}:${seconds}`;
	}
	getTimestampNow() {
		var date = new Date();

		var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = date.getFullYear();

		var seconds = String(date.getSeconds()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');
		var hour = String(date.getHours()).padStart(2, '0');

		return `${yyyy}-${mm}-${dd} ${hour}:${minutes}:${seconds}`;
	}

	formBuilderValidatorsEmail() {
		return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	}
	validaCPFCNPJ(cpfcnpj) {
		var cpfcnpjJustNumbers = cpfcnpj.replace(/\D/g, '');

		if (cpfcnpjJustNumbers.length == 11) {
			var cpf = cpfcnpjJustNumbers;
			if (
				!cpf ||
				cpf.length != 11 ||
				cpf == '00000000000' ||
				cpf == '11111111111' ||
				cpf == '22222222222' ||
				cpf == '33333333333' ||
				cpf == '44444444444' ||
				cpf == '55555555555' ||
				cpf == '66666666666' ||
				cpf == '77777777777' ||
				cpf == '88888888888' ||
				cpf == '99999999999'
			)
				return false;
			var soma = 0;
			var resto;
			for (var i = 1; i <= 9; i++)
				soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
			resto = (soma * 10) % 11;
			if (resto == 10 || resto == 11) resto = 0;
			if (resto != parseInt(cpf.substring(9, 10))) return false;
			soma = 0;
			for (var i = 1; i <= 10; i++)
				soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
			resto = (soma * 10) % 11;
			if (resto == 10 || resto == 11) resto = 0;
			if (resto != parseInt(cpf.substring(10, 11))) return false;
			return true;
		} else if (cpfcnpjJustNumbers.length == 14) {
			var cnpj = cpfcnpjJustNumbers;
			if (
				!cnpj ||
				cnpj.length != 14 ||
				cnpj == '00000000000000' ||
				cnpj == '11111111111111' ||
				cnpj == '22222222222222' ||
				cnpj == '33333333333333' ||
				cnpj == '44444444444444' ||
				cnpj == '55555555555555' ||
				cnpj == '66666666666666' ||
				cnpj == '77777777777777' ||
				cnpj == '88888888888888' ||
				cnpj == '99999999999999'
			)
				return false;
			var tamanho = cnpj.length - 2;
			var numeros = cnpj.substring(0, tamanho);
			var digitos = cnpj.substring(tamanho);
			var soma = 0;
			var pos = tamanho - 7;
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			if (resultado != digitos.charAt(0)) return false;
			tamanho = tamanho + 1;
			numeros = cnpj.substring(0, tamanho);
			soma = 0;
			pos = tamanho - 7;
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			if (resultado != digitos.charAt(1)) return false;
			return true;
		}
	}

	extensoesProibidas(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var deny = [
			'html',
			'exe',
			'js',
			'py',
			'php',
			'cc',
			'cpp',
			'cxx',
			'c',
			'c++',
			'h',
			'hh',
			'hpp',
			'hxx',
			'h++',
			'c++',
			'jar',
			'java',
			'deb',
			'tar',
			'zip',
		];
		return deny.indexOf(extensao.toLowerCase()) > -1;
	}
	extensoesValidasAnexos(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var days = [
			'pdf',
			'png',
			'jpg',
			'jpeg',
			,
			'doc',
			'docs',
			'docx',
			'xlsx',
			'xls',
		];
		return days.indexOf(extensao.toLowerCase()) > -1;
	}
	getExtensionOfFile(name) {
		return name.split('.').pop();
	}

	onFileChangedAll(event, type = 'image') {
		let findFile = false;

		if (event.target.files[0] == undefined) {
			return false;
		}
		// console.log(event.target.files);
		var selectedFile: any[] = [];
		var urlImg: any[] = [];
		for (let file of event.target.files) {
			for (let ext of this.typeFile[type]) {
				if (file.type.includes(ext)) {
					findFile = true;
					let tmppath = URL.createObjectURL(file);
					urlImg.push(this.sanitizer.bypassSecurityTrustUrl(tmppath));
					selectedFile.push(file);
				}
			}
		}
		if (!findFile) {
			return false;
		}
		// console.log(selectedFile);

		if (selectedFile.length == 1) {
			const selectF = selectedFile.shift();
			const urlI = urlImg.shift();
			return { selectedFile: selectF, urlImg: urlI };
		}
		return { selectedFile, urlImg };
	}
	onFileChanged(event) {
		if (this.extensoesProibidas(event)) {
			this.notificationService.notifySweet('Arquivo Proibido');
			return false;
		}
		var tmppath = URL.createObjectURL(event.target.files[0]);
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		let img;
		switch (extensao) {
			case 'png':
			case 'jpg':
			case 'jpeg':
				img = tmppath;
				break;
			default:
				img = '/assets/img/file/' + extensao + '.svg';
				break;
		}
		let selectedFile = event.target.files[0];
		let dados: object = { img: img, selectedFile: selectedFile };

		return dados;
	}
	onFileSet(no_documento) {
		let extensao = this.getExtensionOfFile(no_documento);
		let img;
		switch (extensao) {
			case 'png':
			case 'jpg':
			case 'jpeg':
				img = no_documento;
				break;
			default:
				img = '/assets/img/file/' + extensao + '.svg';
				break;
		}
		return img;
	}

	formatarDataParaCompararNoBanco(data) {
		if (data) {
			let dia = data.getDate().toString();
			let diaF = dia.length == 1 ? '0' + dia : dia;
			let mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
			let mesF = mes.length == 1 ? '0' + mes : mes;
			let anoF = data.getFullYear();
			return anoF + '-' + mesF + '-' + diaF;
		}
	}

	encrypt(dados) {
		dados = dados.replace(/A/g, 'গ');
		dados = dados.replace(/B/g, 'খ');
		dados = dados.replace(/C/g, 'ক');
		dados = dados.replace(/D/g, 'ঔ');
		dados = dados.replace(/E/g, 'ও');
		dados = dados.replace(/F/g, 'ঐ');
		dados = dados.replace(/G/g, 'এ');
		dados = dados.replace(/H/g, 'ঌ');
		dados = dados.replace(/I/g, 'ঋ');
		dados = dados.replace(/J/g, 'ঊ');
		dados = dados.replace(/K/g, 'উ');
		dados = dados.replace(/L/g, 'ঈ');
		dados = dados.replace(/M/g, 'ই');
		dados = dados.replace(/N/g, 'আ');
		dados = dados.replace(/O/g, 'অ');
		dados = dados.replace(/P/g, 'ॿ');
		dados = dados.replace(/Q/g, 'ॾ');
		dados = dados.replace(/R/g, 'ॼ');
		dados = dados.replace(/S/g, 'ॻ');
		dados = dados.replace(/T/g, 'ॲ');
		dados = dados.replace(/U/g, '९');
		dados = dados.replace(/V/g, '७');
		dados = dados.replace(/W/g, 'ॠ');
		dados = dados.replace(/X/g, 'ॡ');
		dados = dados.replace(/Y/g, 'फ़');
		dados = dados.replace(/Z/g, 'ॐ');

		dados = dados.replace(/a/g, 'अ');
		dados = dados.replace(/b/g, 'आ');
		dados = dados.replace(/c/g, 'इ');
		dados = dados.replace(/d/g, 'ई');

		dados = dados.replace(/e/g, 'उ');
		dados = dados.replace(/f/g, 'ऊ');
		dados = dados.replace(/g/g, 'ऋ');
		dados = dados.replace(/h/g, 'ऌ');
		dados = dados.replace(/i/g, 'ऍ');
		dados = dados.replace(/j/g, 'ऎ');
		dados = dados.replace(/k/g, 'ए');
		dados = dados.replace(/l/g, 'ऐ');
		dados = dados.replace(/m/g, 'ঙ');
		dados = dados.replace(/n/g, 'ঘ');
		dados = dados.replace(/o/g, 'ओ');
		dados = dados.replace(/p/g, 'औ');
		dados = dados.replace(/q/g, 'क');
		dados = dados.replace(/r/g, 'ख');
		dados = dados.replace(/s/g, 'ग');
		dados = dados.replace(/t/g, 'घ');
		dados = dados.replace(/u/g, 'ङ');
		dados = dados.replace(/v/g, 'च');
		dados = dados.replace(/w/g, 'छ');
		dados = dados.replace(/x/g, 'ज');
		dados = dados.replace(/y/g, 'झ');
		dados = dados.replace(/z/g, 'ञ');

		dados = dados.replace(/á/g, 'ट');
		dados = dados.replace(/é/g, 'य');
		dados = dados.replace(/í/g, 'म');
		dados = dados.replace(/ó/g, 'भ');
		dados = dados.replace(/ú/g, 'ब');

		dados = dados.replace(/à/g, 'फ');
		dados = dados.replace(/è/g, 'प');
		dados = dados.replace(/ì/g, 'ऩ');
		dados = dados.replace(/ò/g, 'न');
		dados = dados.replace(/ù/g, 'ध');

		dados = dados.replace(/ã/g, 'द');
		dados = dados.replace(/õ/g, 'थ');

		dados = dados.replace(/ç/g, 'त');

		dados = dados.replace(/ê/g, 'ण');

		dados = dados.replace(/ /g, '߷');

		dados = dados.replace(/"/g, 'रू');
		dados = dados.replace(/{/g, 'कु');
		dados = dados.replace(/}/g, 'ञ्');
		dados = dados.replace(/:/g, 'बा');
		dados = dados.replace(/,/g, 'र');

		return dados;
	}
	decrypt(dados) {
		var result;
		dados = dados.replace(/গ/g, 'A');
		dados = dados.replace(/খ/g, 'B');
		dados = dados.replace(/ক/g, 'C');
		dados = dados.replace(/ঔ/g, 'D');
		dados = dados.replace(/ও/g, 'E');
		dados = dados.replace(/ঐ/g, 'F');
		dados = dados.replace(/এ/g, 'G');
		dados = dados.replace(/ঌ/g, 'H');
		dados = dados.replace(/ঋ/g, 'I');
		dados = dados.replace(/ঊ/g, 'J');
		dados = dados.replace(/উ/g, 'K');
		dados = dados.replace(/ঈ/g, 'L');
		dados = dados.replace(/ই/g, 'M');
		dados = dados.replace(/আ/g, 'N');
		dados = dados.replace(/অ/g, 'O');
		dados = dados.replace(/ॿ/g, 'P');
		dados = dados.replace(/ॾ/g, 'Q');
		dados = dados.replace(/ॼ/g, 'R');
		dados = dados.replace(/ॻ/g, 'S');
		dados = dados.replace(/ॲ/g, 'T');
		dados = dados.replace(/९/g, 'U');
		dados = dados.replace(/७/g, 'V');
		dados = dados.replace(/ॠ/g, 'W');
		dados = dados.replace(/ॡ/g, 'X');
		dados = dados.replace(/फ़/g, 'Y');
		dados = dados.replace(/ॐ/g, 'Z');

		dados = dados.replace(/अ/g, 'a');
		dados = dados.replace(/आ/g, 'b');
		dados = dados.replace(/इ/g, 'c');
		dados = dados.replace(/ई/g, 'd');
		dados = dados.replace(/उ/g, 'e');
		dados = dados.replace(/ऊ/g, 'f');
		dados = dados.replace(/ऋ/g, 'g');
		dados = dados.replace(/ऌ/g, 'h');
		dados = dados.replace(/ऍ/g, 'i');
		dados = dados.replace(/ऎ/g, 'j');
		dados = dados.replace(/ए/g, 'k');
		dados = dados.replace(/ऐ/g, 'l');
		dados = dados.replace(/ঙ/g, 'm');
		dados = dados.replace(/ঘ/g, 'n');
		dados = dados.replace(/ओ/g, 'o');
		dados = dados.replace(/औ/g, 'p');
		dados = dados.replace(/क/g, 'q');
		dados = dados.replace(/ख/g, 'r');
		dados = dados.replace(/ग/g, 's');
		dados = dados.replace(/घ/g, 't');
		dados = dados.replace(/ङ/g, 'u');
		dados = dados.replace(/च/g, 'v');
		dados = dados.replace(/छ/g, 'w');
		dados = dados.replace(/ज/g, 'x');
		dados = dados.replace(/झ/g, 'y');
		dados = dados.replace(/ञ/g, 'z');

		dados = dados.replace(/ट/g, 'á');
		dados = dados.replace(/य/g, 'é');
		dados = dados.replace(/म/g, 'í');
		dados = dados.replace(/भ/g, 'ó');
		dados = dados.replace(/ब/g, 'ú');

		dados = dados.replace(/फ/g, 'à');
		dados = dados.replace(/प/g, 'è');
		dados = dados.replace(/ऩ/g, 'ì');
		dados = dados.replace(/न/g, 'ò');
		dados = dados.replace(/ध/g, 'ù');

		dados = dados.replace(/द/g, 'ã');
		dados = dados.replace(/थ/g, 'õ');

		dados = dados.replace(/त/g, 'ç');

		dados = dados.replace(/ण/g, 'ê');

		dados = dados.replace(/߷/g, ' ');

		dados = dados.replace(/Գ/g, '0');
		dados = dados.replace(/Բ/g, '1');
		dados = dados.replace(/Ա/g, '2');
		dados = dados.replace(/Ѿ/g, '3');
		dados = dados.replace(/Ѽ/g, '4');
		dados = dados.replace(/Ϫ/g, '5');
		dados = dados.replace(/ϟ/g, '6');
		dados = dados.replace(/ƨ/g, '7');
		dados = dados.replace(/Ʀ/g, '8');
		dados = dados.replace(/ƣ/g, '9');

		dados = dados.replace(/रू/g, '"');
		dados = dados.replace(/कु/g, '{');
		dados = dados.replace(/ञ्/g, '}');
		dados = dados.replace(/बा/g, ':');
		dados = dados.replace(/र/g, ',');

		return dados;
	}
}
