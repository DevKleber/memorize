import { Injectable } from "@angular/core";

@Injectable()
export class Calculos {
    constructor() { }

    juros(valueCart,qt_parcela,taxaIntermediacao,jurosAoMes,jurosAVista){
        /*
            jurosAoMes é a taxa de juros para compra parcelada.
            jurosAVista é a taxa de juros para compras no cartão em uma vez.
            taxaIntermediacao é a taxa que a operadora do cartão cobra.
        */
       if(qt_parcela==0){
            var resultado={}
            resultado['valorFinalPagarJuros'] = valueCart;
            resultado['valorParcelaFinal'] = resultado['valorFinalPagarJuros'];
            return resultado;
       }
		let parcela = (valueCart / qt_parcela);
        let taxaToReal = valueCart * taxaIntermediacao

        //crédito avista;
        if(qt_parcela == 1){
            var resultado={}
            resultado['valorFinalPagarJuros'] = (valueCart *jurosAVista)+valueCart;
            resultado['valorParcelaFinal'] = resultado['valorFinalPagarJuros'];
            return resultado;
        }

        var parcelas = []
		var totalDesagio = 0;
		var totalDesagioPorcentagemParcela = 0;
		var totalValorPresente = 0;
		for (let index = 0; index < qt_parcela; index++) {
            let parcelatual = index + 1;
            if(qt_parcela == 1){
                var vlParcela = parcela / (Math.pow((1 + jurosAVista), parcelatual));
            }else{
                var vlParcela = parcela / (Math.pow((1 + jurosAoMes), parcelatual));
            }
			var desagio = (parcela - vlParcela)
			var desagioPorcentagemParcela = (vlParcela / parcela)
			var valorPresente = (parcela * desagioPorcentagemParcela)

			totalDesagio += desagio
			totalDesagioPorcentagemParcela += desagioPorcentagemParcela
			totalValorPresente += valorPresente
			parcelas.push({ parcela: index + 1, vlparcela: vlParcela, desagio: desagio, desagioPorcentagemParcela: desagioPorcentagemParcela, valorPresente: valorPresente })
		}
		let taxaParcelamento = (totalDesagio / valueCart)
		let valorParcelamento = (valueCart - totalValorPresente)
        let valorFinalPagar = (valueCart - taxaToReal -valorParcelamento)
        

        
        var resultado={}
		resultado['valorFinalPagarJuros'] = (valueCart - valorFinalPagar)+valueCart;
        resultado['valorParcelaFinal'] = resultado['valorFinalPagarJuros']/qt_parcela;
        return resultado;
    }

    pagSeguro(valueCart,qt_parcela,juros,jurosAoMes,jurosAVista){
		let parcela = (valueCart / qt_parcela);
        let taxaToReal = valueCart * juros

        //crédito avista;
        if(qt_parcela == 1){
            let taxaParcelamento = (totalDesagio / valueCart)
            let valorParcelamento = (valueCart - totalValorPresente)
            let valorFinalPagar = (valueCart - taxaToReal -valorParcelamento)
            valorFinalPagar = (valueCart-valorParcelamento)
            var resultado={}
            resultado['valorFinalPagarJuros'] = (valueCart *jurosAVista)+valueCart;
            resultado['valorParcelaFinal'] = resultado['valorFinalPagarJuros'];
            return resultado;
        }

        
        
        var parcelas = []
		var totalDesagio = 0;
		var totalDesagioPorcentagemParcela = 0;
		var totalValorPresente = 0;
		for (let index = 0; index < qt_parcela; index++) {
            let parcelatual = index + 1;
            if(qt_parcela == 1){
                var vlParcela = parcela / (Math.pow((1 + jurosAVista), parcelatual));
            }else{
                var vlParcela = parcela / (Math.pow((1 + jurosAoMes), parcelatual));
            }
			var desagio = (parcela - vlParcela)
			var desagioPorcentagemParcela = (vlParcela / parcela)
			var valorPresente = (parcela * desagioPorcentagemParcela)

			totalDesagio += desagio
			totalDesagioPorcentagemParcela += desagioPorcentagemParcela
			totalValorPresente += valorPresente
			parcelas.push({ parcela: index + 1, vlparcela: vlParcela, desagio: desagio, desagioPorcentagemParcela: desagioPorcentagemParcela, valorPresente: valorPresente })
		}

		let taxaParcelamento = (totalDesagio / valueCart)
		let valorParcelamento = (valueCart - totalValorPresente)
        let valorFinalPagar = (valueCart - taxaToReal -valorParcelamento)
        

        
        var resultado={}
		resultado['valorFinalPagarJuros'] = (valueCart - valorFinalPagar)+valueCart;
        resultado['valorParcelaFinal'] = resultado['valorFinalPagarJuros']/qt_parcela;
        return resultado;

		// console.log(parcelas);
		// console.log(totalDesagioPorcentagemParcela);
		// console.log(totalDesagio);
		// console.log(taxaParcelamento);
		// console.log("totalValorPresente: "+totalValorPresente);
		// console.log("valorParcelamento: "+valorParcelamento);
		// console.log("Valor Final: "+valorFinalPagar);
    }

    sumUp(valor = 2000, txDebito = 0.01, txCreditoVista = 0.01, txCreditoParcelado = 0.046, txParcelamento = 0.015) {

        let resultados = [];
        var debito = {};
        debito['plano'] = "Débito";
        debito['valor'] = valor;
        debito['taxaTotal'] = round(txDebito * 100, 2) / 100;
        debito['valorLiquido'] = ((debito['valor']) * (1 - txDebito));
        debito['valorVendaJurosCliente'] = ((debito['valor']) / (1 - txDebito));
        debito['valorParcelaJurosCliente'] = debito['valorVendaJurosCliente'];
        debito['taxaDebito'] = debito['valor'] * debito['taxaTotal'];
        debito['taxaDebitoJurosCliente'] = debito['valorVendaJurosCliente'] - debito['valor'];
        debito['taxaParcelamento'] = 0;
        debito['valorTaxaParcelamento'] = 0;
        debito['taxaIntermediacao'] = 0;
        debito['valorTaxaIntermediacao'] = 0;
        debito['valorParcela'] = valor;
        debito['valorParcelaComTxParcelamento'] = debito['valor'];
        debito['valorTotalComTxParcelamento'] = debito['valor'];
        debito['valorLiquidoComTaxaIntermediacao'] = ((debito['valor']) * (1 - txDebito));
        resultados.push(debito);
        var valorTaxaParcelamento;
        for (var qtdeParcelas = 1; qtdeParcelas <= 12; qtdeParcelas++) {

            valorTaxaParcelamento = (qtdeParcelas == 1 ? 0 : calcularTxParcelamento(valor, txParcelamento, qtdeParcelas))

            var credito = {};
            credito['plano'] = "Crédito " + qtdeParcelas + "x";
            credito['valor'] = valor;
            credito['taxaParcelamento'] = 100 * (valorTaxaParcelamento / valor);
            credito['taxaParcelamento'] = round(credito['taxaParcelamento'], 2) / 100;
            credito['valorTaxaParcelamento'] = valorTaxaParcelamento;
            credito['taxaIntermediacao'] = (qtdeParcelas == 1 ? txCreditoVista : txCreditoParcelado);
            credito['valorTaxaIntermediacao'] = credito['taxaIntermediacao'] * valor;
            credito['taxaTotal'] = 100 * ((valorTaxaParcelamento + (credito['taxaIntermediacao'] * valor)) / valor);
            credito['taxaTotal'] = round(credito['taxaTotal'].toFixed(2), 2) / 100;
            credito['valorLiquido'] = ((valor) * (1 - credito['taxaTotal']));
            credito['valorVendaJurosCliente'] = ((valor) / (1 - credito['taxaTotal']));
            credito['valorParcelaJurosCliente'] = ((credito['valorVendaJurosCliente']) / qtdeParcelas);
            credito['valorParcela'] = valor / qtdeParcelas;
            credito['taxaDebito'] = 0;
            credito['taxaDebitoJurosCliente'] = 0;
            credito['valorTotalComTxParcelamento'] = ((valor - (valor * credito['taxaIntermediacao'])) / (1 - credito['taxaTotal']));
            credito['valorParcelaComTxParcelamento'] = credito['valorTotalComTxParcelamento'] / qtdeParcelas;
            credito['valorLiquidoComTaxaIntermediacao'] = (credito['valorTotalComTxParcelamento'] * (1 - credito['taxaTotal']));
            resultados.push(credito)
        }
        console.log(resultados);

        function calcularTxParcelamento(valor, txParcelamento, qtdeParcelas) {
            return valor * (txParcelamento * (qtdeParcelas - 1))
        }

        function round(value, decimals) {
            return Number(Math.round(value + decimals) + "e-" + decimals)
        }

    }


    /*
    PAGSEGURO
    */
    pagseguroNotWorking(valor = 2000, txDebito = 0.0239, txParcelamento = 0.0299, txCreditoVista = 0.0319, txCreditoParcelado = 0.0379) {

        var resultados = [];
        var debito = {};
        debito['plano'] = "Débito";
        debito['valor'] = valor;
        debito['taxaTotal'] = round(txDebito * 100, 2) / 100;
        debito['valorLiquido'] = ((valor) * (1 - txDebito));
        debito['valorVendaJurosCliente'] = ((valor) / (1 - txDebito));
        debito['valorParcelaJurosCliente'] = debito['valorVendaJurosCliente'];
        debito['taxaDebito'] = valor * debito['taxaTotal'];
        debito['taxaDebitoJurosCliente'] = debito['valorVendaJurosCliente'] - valor;
        debito['taxaParcelamento'] = 0;
        debito['taxaIntermediacao'] = 0;
        debito['valorTaxaParcelamento'] = 0;
        debito['valorTaxaIntermediacao'] = 0;
        debito['valorParcela'] = valor;
        debito['valorParcelaComTxParcelamento'] = valor;
        debito['valorTotalComTxParcelamento'] = valor;
        debito['valorLiquidoComTaxaIntermediacao'] = ((valor) * (1 - txDebito));

        resultados.push(debito);

        var valorTaxaParcelamento;
        for (var qtdeParcelas = 1; qtdeParcelas <= 12; qtdeParcelas++) {
            valorTaxaParcelamento = (qtdeParcelas == 1 ? 0 : calcularTxParcelamento(valor, qtdeParcelas, txParcelamento));
            var credito = {};
            credito['plano'] = "Crédito " + qtdeParcelas + "x";
            credito['valor'] = valor;
            credito['taxaParcelamento'] = 100 * (valorTaxaParcelamento / valor);
            credito['taxaParcelamento'] = round(credito['taxaParcelamento'], 2) / 100;
            credito['valorTaxaParcelamento'] = valorTaxaParcelamento;
            credito['taxaIntermediacao'] = (qtdeParcelas == 1 ? txCreditoVista : txCreditoParcelado);
            credito['valorTaxaIntermediacao'] = ((qtdeParcelas == 1 ? txCreditoVista : txCreditoParcelado) * valor);
            credito['taxaTotal'] = 100 * ((valorTaxaParcelamento + ((qtdeParcelas == 1 ? txCreditoVista : txCreditoParcelado) * valor)) / valor);
            credito['taxaTotal'] = round(credito['taxaTotal'].toFixed(2), 2) / 100;
            credito['valorLiquido'] = ((valor) * (1 - credito['taxaTotal']));
            credito['valorVendaJurosCliente'] = ((valor) / (1 - credito['taxaTotal']));
            credito['valorParcelaJurosCliente'] = ((credito['valorVendaJurosCliente']) / qtdeParcelas);
            credito['valorParcela'] = valor / qtdeParcelas;
            credito['taxaDebito'] = 0;
            credito['taxaDebitoJurosCliente'] = 0;
            credito['valorTotalComTxParcelamento'] = ((valor - (valor * credito['taxaIntermediacao'])) / (1 - credito['taxaTotal']));
            credito['valorParcelaComTxParcelamento'] = credito['valorTotalComTxParcelamento'] / qtdeParcelas;
            credito['valorLiquidoComTaxaIntermediacao'] = (credito['valorTotalComTxParcelamento'] * (1 - credito['taxaTotal']));
            resultados.push(credito)
        }
        console.log(resultados);

        function calcularTxParcelamento(valorVenda, qtdeParcelas, txParcelamento) {
            var vtp = 0;
            var vp = (valorVenda / qtdeParcelas);
            for (var i = 1; i <= qtdeParcelas; i++) {
                vtp = vtp + (vp / Math.pow(1 + txParcelamento, i))
            }
            return valorVenda - vtp
        }


        function round(value, decimals) {
            return Number(Math.round(value + decimals) + "e-" + decimals)
        }
    }















}