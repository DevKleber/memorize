<?php 

namespace App\Library;

class BuscaNcm
{    
    function __construct() {
        // $this->getLogradouroCorreio($ncm);
    }
    public static function consultaBuscaNcm($ncm){
        $url = "https://cosmos.bluesoft.com.br/produtos/$ncm";
        $dados = http_build_query(array(
            // "relaxation"=>"$ncm","tipoBuscaNcm"=>"ALL","semelhante"=>"N"
            ));
        $contexto = stream_context_create(array(
            'http' => array(
                'method' => 'GET',
                // 'content' => $dados,
                'header' => "Content-type: application/x-www-form-urlencoded\r\n"
                . "Content-Length: " . strlen($dados) . "\r\n",
            )
        ));
        $DOMDocument = new \DOMDocument('1.0', 'utf-8');
        libxml_use_internal_errors(true);
        try {
            $DOMDocument->loadHTML(file_get_contents($url, null, $contexto));
            $DOMXPath = new \DOMXPath($DOMDocument);
            $elementos= [];
            foreach ($DOMXPath->query('.//h1') as $Nodes) {
                foreach ($Nodes->childNodes as $Node) {
                    $elemento[] = ltrim(strip_tags($Node->nodeValue));
                }
                $elementos['name'][] = $elemento;
            }
            $elemento= [];
            foreach ($DOMXPath->query('.//span[@class=\'description ncm-name label-figura-fiscal\']') as $Nodes) {
                $ncm = ltrim(strip_tags($Nodes->nodeValue));
                $ncm = explode('-',$ncm)[0];
                $ncm = str_replace(' ','',$ncm);
                $elementos['ncm'] = $ncm;
            }
            $elemento= [];
            foreach ($DOMXPath->query('.//span[@class=\'brand-name\']') as $Nodes) {
                $elementos['marca'] = ltrim(strip_tags($Nodes->nodeValue));
            }
            $elemento= [];
            foreach ($DOMXPath->query('.//span[@class=\'description cest-name\']') as $Nodes) { 
                $cest = ltrim(strip_tags($Nodes->nodeValue));    
                $cest = str_replace("\n","",$cest);       
                $cest = explode('-',$cest);
                $elementos['cest'] = $cest[0];
            }
        } catch (\Throwable $th) {
            $elementos = [];
        }
        
        
        return $elementos;
    }
    
    public static function getNcm($ncm){
        $produto = self::consultaBuscaNcm($ncm);
        if(count($produto) > 0){
            return [
                "produto" => str_replace("\n","",current($produto['name'])[0]),
                "ncm" => str_replace('.','',$produto['ncm']),
                "marca" => str_replace("\n","",$produto['marca']),
                "cest" => isset($produto['cest'])?$produto['cest']:null
            ];
        }
        return [
            "produto" => '',
            "ncm" => '',
            "marca" => '',
            "cest" => ''
        ];
    }
    
}