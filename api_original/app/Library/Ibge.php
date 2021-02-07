<?php
namespace App\Library;

class Ibge{

    public static function getCodByCep($cep){

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://cep.awesomeapi.com.br/JSON/$cep",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Cache-Control: no-cache",
                "Connection: keep-alive",
                "Host: cep.awesomeapi.com.br"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return ['error'];
        } else {
            return $response;
        }
    }
}