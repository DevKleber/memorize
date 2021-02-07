<?php 
namespace App\Library;
use Helpers;

class ConsultarCnpj{

    public static function find($cnpj) {
        $cnpj = Helpers::removerCaracteresEspeciaisEspacos($cnpj);
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://www.receitaws.com.br/v1/cnpj/$cnpj",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Host: www.receitaws.com.br",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        }
        return $response;
    }
}
