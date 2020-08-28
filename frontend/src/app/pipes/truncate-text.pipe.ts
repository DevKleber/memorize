import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limiteTexto'
})
export class TruncateTextPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
