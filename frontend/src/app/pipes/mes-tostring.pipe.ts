import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesTostring'
})
export class MesTostringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.convertMesToString(value.toString());
  }
  convertMesToString(mes: string) {
    console.log(mes);
    let mesTexto = ''
    switch (mes) {
      case '01': {
        mesTexto = "Janeiro"
        break;
      }
      case '1': {
        mesTexto = "Janeiro"
        break;
      }
      case '02': {
        mesTexto = "Fevereiro"
        break;
      }
      case '2': {
        mesTexto = "Fevereiro"
        break;
      }
      case '03': {
        mesTexto = "Março"
        break;
      }
      case '3': {
        mesTexto = "Março"
        break;
      }
      case '04': {
        mesTexto = "Abril"
        break;
      }
      case '4': {
        mesTexto = "Abril"
        break;
      }
      case '05': {
        mesTexto = "Maio"
        break;
      }
      case '5': {
        mesTexto = "Maio"
        break;
      }
      case '06': {
        mesTexto = "Junho"
        break;
      }
      case '6': {
        mesTexto = "Junho"
        break;
      }
      case '07': {
        mesTexto = "Julho"
        break;
      }
      case '7': {
        mesTexto = "Julho"
        break;
      }
      case '08': {
        mesTexto = "Agosto"
        break;
      }
      case '8': {
        mesTexto = "Agosto"
        break;
      }
      case '09': {
        mesTexto = "Setembro"
        break;
      }
      case '9': {
        mesTexto = "Setembro"
        break;
      }
      case '10': {
        mesTexto = "Outubro"
        break;
      }
      case '11': {
        mesTexto = "Novembro"
        break;
      }
      case '12': {
        mesTexto = "Dezembro"
        break;
      }
      
      default: {
        break;
      }
    }
    return mesTexto
  }

}
