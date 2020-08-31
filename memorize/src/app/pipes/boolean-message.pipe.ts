
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'BooleanMessage'
})
export class BooleanMessagePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
  transform(value: any, args?: any): any {
	return this.sanitizer.bypassSecurityTrustHtml(this.tratarBo(value, args));
  }
  tratarBo(value: any, args: string) {
    let texto = '';
    switch (args) {
      case 'simnao': {
        texto = "SIM"
        if (value == "0") {
          texto = "NÃO";
        }
        break;
      }
      case 'bo_ativo': {
        texto = "ATIVO"
        if (value == "0") {
          texto = "INATIVO";
        }
        break;
      }
      case 'bo_pago_withbg': {
        texto = "<div class='label label-table label-danger'>A pagar</div>";
        if (value == "1") {
          texto = "<div class='label label-table label-success'>Pago</div>"
        }
        break;
      }
      case 'bo_ativo_withbg': {
        texto = "<div class='label label-table label-success'>Ativo</div>"
        if (value == "0") {
          texto = "<div class='label label-table label-danger'>Inativo</div>";
        }
        break;
      }
      case 'bo_incluso_nota_withbg': {
        texto = "<div class='label label-table label-success'>Incluso</div>"
        if (value == "0") {
          texto = "<div class='label label-table'>não incluso</div>";
        }
        break;
      }
      case 'tp_pessoa': {
        texto = "Fisica"
        if (value == "juridica") {
          texto = "Juridica";
        }
        break;
      }
      case 'bo_produto_servico': {
        texto = "Serviço"
        if (value == "1") {
          texto = "Produto";
        }
        break;
      }
      case 'pagamento': {
        texto = "<span class='label label-table label-success'>PAGO</span>"
        if (value == "0") {
          texto = "<span class='label label-table label-danger'>ABERTO</span>";
        }
        break;
      }
      case 'aguardando': {
        if (value == "0") {
          texto = "Aguardando Pagamento"
        }
        break;
      }
      case 'frequencia-cor': {
        texto = ""
        if (value == "p") {
          texto = "green";
        }
        if (value == "f") {
          texto = "red";
        }
        if (value == "j") {
          texto = "";
        }
        if (value == "") {
          texto = "";
        }

        if(value == "+"){
          texto = "green";
        }
        if(value == "-"){
          texto = "#ff0000";
        }
        if(parseInt(value) < 0){
          texto = "#ff0000";
        }
        break;
      }
      default: {
        break;
      }
    }
    return texto;
  }

}

