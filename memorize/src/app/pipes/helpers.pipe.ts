import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "helpers",
})
export class HelpersPipe implements PipeTransform {
	transform(value: any, args?: any, args1?: any): any {
		return this.oquefazer(value, args, args1);
	}

	oquefazer(value: string, args: string, args1: string) {
		let texto = "";
		switch (args) {
			case "zeroEsquerda": {
				return this.zeroEsquerda(value, args1);
				break;
			}
			case "formatDate2BR": {
				return this.formatDate2BR(value, args1);
				break;
			}
			case "tp_cadastro": {
				return this.tp_cadastro(value, args1);
				break;
			}
			case "getFileExtension": {
				return this.getFileExtension(value, args1);
				break;
			}
			case "iconorder": {
				return this.iconorder(value, args1);
				break;
			}
			case "pedidoAceitoRecusado": {
				return this.pedidoAceitoRecusado(value, args1);
				break;
			}
			case "ifTimeIsNull": {
				return this.ifTimeIsNull(value, args1);
				break;
			}
			case "CaixaAbertoFechado": {
				return this.CaixaAbertoFechado(value);
				break;
			}
			case "caixaIsMy": {
				return this.caixaIsMy(value, args1);
				break;
			}
			case "checkVencimento": {
				return this.checkVencimento(value, args1);
				break;
			}
			case "checkSorteado": {
				return this.checkSorteado(value, args1);
				break;
			}
			case "imgIsDevMode": {
				return this.imgIsDevMode(value, args1);
				break;
			}
			case "comprovanteStatus": {
				return this.comprovanteStatus(value, args1);
				break;
			}
			default: {
				break;
			}
		}
		return texto;
	}
	comprovanteStatus(value, palavra) {

		if(value == true){
			return '<div class="label label-table label-success">Aprovado</div>';
		}else if(value != null){
			return '<div class="label label-table label-danger">Reprovado</div>';
		}
	}
	formatDate2BR(value, palavra) {
		if (value) {
			const arDate = value.split("-");
			if (arDate.length == 3) {
				return arDate[2] + "/" + arDate[1] + "/" + arDate[0];
			}
		}
		return "";
	}
	caixaIsMy(id, args) {
		let myCaixa = localStorage.getItem("caixa");
		if (myCaixa == id) {
			if (args == "label") {
				return "Sim";
			} else {
				return "caixaUsing";
			}
		}
		if (args == "label") return "Não";
	}

	CaixaAbertoFechado(id_caixa_tipo) {
		if (id_caixa_tipo == 5) {
			return "<div class='label label-table label-success piscando'>Aberto</div>";
		} else if (id_caixa_tipo == 6) {
			return "<div class='label label-table label-danger'>Fechado</div>";
		} else {
			return "";
		}
	}
	zeroEsquerda(value, cotas) {
		var valorCotas = (cotas - 1);
		var casasDecimais = valorCotas.toString().length;
		var zeros = "";
		for (let index = 0; index < casasDecimais; index++) {
			zeros +='0';
		}
		return (zeros + value).slice(-casasDecimais);
	}
	pedidoAceitoRecusado(value, palavra) {
		// console.log(value);
		if (value.ts_pedido_aceitorecusado) {
			if (value.bo_aceito) {
				return "statusPedido-aceito-cor";
			}
			return "statusPedido-recusado-cor";
		}
	}
	imgIsDevMode(value, palavra) {
		let url = value.replace(/public\//g, "");
		return url;
	}
	checkSorteado(value, palavra) {
		var UserDate = value;
		if (value.length == 10) {
			UserDate = value + " 23:59:59";
		}
		var ToDate = new Date();

		var retorno = null;
		if (new Date(UserDate).getTime() < ToDate.getTime()) {
			retorno =
				"<div class='label label-table label-info'>Sorteado</div>";
		}
		return retorno;
	}
	checkVencimento(value, palavra) {
		var UserDate = value;
		if (value.length == 10) {
			UserDate = value + " 23:59:59";
		}
		var ToDate = new Date();

		var retorno = null;
		if (new Date(UserDate).getTime() < ToDate.getTime()) {
			retorno =
				"<div class='label label-table label-danger'>Sorteado</div>";
		}
		return retorno;
	}
	ifTimeIsNull(value, palavra) {
		if (value) {
			return value;
		}
		return "--:--";
	}
	tp_fisicajuridica(value, palavra) {
		if (value == "fisica") {
			return "Pessoa fisica";
		}
		return "Pessoa juridica";
	}
	tp_cadastro(value, palavra) {
		if (value == 1) {
			return "Voto Certo";
		} else if (value == 2) {
			return "Indeciso";
		}
		return "Oposição";
	}
	getFileExtension(value, palavra) {
		if (value) {
			return value.split(".").pop() + ".svg";
		}
		return "file.svg";
	}
	iconorder(value, palavra) {
		return value == ""
			? "fas fa-sort"
			: value == "desc"
			? "fas fa-sort-down"
			: "fas fa-sort-up";
	}
}
