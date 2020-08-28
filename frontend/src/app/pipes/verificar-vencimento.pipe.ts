import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verificarVencimento'
})
export class VerificarVencimentoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.vencimento(value,args);
  }
  vencimento(mes: string,args:string) {
    if(args=="0"){

      var d = new Date();
      let mm = ("0" + (d.getMonth() + 1)).slice(-2); //January is 0!
      let dia = ("0" + (d.getDate())).slice(-2); //January is 0!
      let hoje = d.getFullYear() + "-" + mm + "-" + dia;
      
      
      var vencimentoMensalidade = new Date(mes).getTime();
      var dataAtual = new Date(hoje).getTime();
      var umDiaMilissegundos = 1000 * 60 * 60 * 24;
      var diferencaMilissegundos = vencimentoMensalidade - dataAtual;
      var diferencaData = Math.round(diferencaMilissegundos / umDiaMilissegundos);
      let cor = ''
      
      if (diferencaData < 0) {
        cor = "red"
      }
      return cor
    }
  }

}
