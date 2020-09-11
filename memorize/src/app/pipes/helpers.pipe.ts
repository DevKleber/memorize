import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'helpers',
})
export class HelpersPipe implements PipeTransform {
	transform(value: any, args?: any, args1?: any): any {
		return this.oquefazer(value, args, args1);
	}

	oquefazer(value: string, args: string, args1: string) {
		let texto = '';
		switch (args) {
			case 'isDevMode': {
				return this.isDevMode(value, args1);
				break;
			}
			default: {
				break;
			}
		}
		return texto;
	}

	isDevMode(value, palavra) {
		let url = value.replace(/public\//g, '');
		return url;
	}
}
