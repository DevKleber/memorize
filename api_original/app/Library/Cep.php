<?php 

namespace App\Library;

class Cep
{    
    function __construct() {
        // $this->getLogradouroCorreio($cep);
    }
    public static function consultaCepCorreio($cep){
        $url = "http://www.buscacep.correios.com.br/sistemas/buscacep/resultadoBuscaCepEndereco.cfm";
        $dados = http_build_query(array(
            "relaxation"=>"$cep","tipoCEP"=>"ALL","semelhante"=>"N"
            ));
        $contexto = stream_context_create(array(
            'http' => array(
                'method' => 'POST',
                'content' => $dados,
                'header' => "Content-type: application/x-www-form-urlencoded\r\n"
                . "Content-Length: " . strlen($dados) . "\r\n",
            )
        ));
        $DOMDocument = new \DOMDocument('1.0', 'utf-8');
        libxml_use_internal_errors(true);
        $DOMDocument->loadHTML(file_get_contents($url, null, $contexto));
        $DOMXPath = new \DOMXPath($DOMDocument);
        $contadorSelic = 0;
        foreach ($DOMXPath->query('.//td') as $Nodes) {
            $Atributos[] = $Nodes->getAttribute('name');
            foreach ($Nodes->childNodes as $Node) {
                $elemento[$Node->nodeName] = $Node->nodeValue;
            }
            $elementos[] = $elemento;
        }
        return $elementos;
    }
    public static function getLogradouroCorreio($cep){
        $correio = self::consultaCepCorreio($cep);
        if(count($correio)<=0){
            return ['DADOS NAO ENCONTRADOS'];
        }
        
        $cidaUf = explode("/",$correio[2]["#text"]);
        
        $cidade = $cidaUf[0];
        $uf = trim($cidaUf[1], " \t\n\r\0\x0B\xC2\xA0");
        $bairro = $correio[1]["#text"];
        $tipo = explode(" ",$correio[0]["#text"]);
        $tipo_logradouro = $tipo[0];
        $logradouro = $correio[0]["#text"];
        
        
        return [
            "localidade" => $cidade,
            "uf" => $uf,
            "bairro" => $bairro,
            "tipo_logradouro" => $tipo_logradouro,
            "logradouro" => $logradouro,
        ];
    }
    
}