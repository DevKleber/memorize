<?php 

namespace App\Library;

class BuscaImagens
{    
    function __construct() { }

    public static function getImagensByBingSearch($arQuery,$quantidade){
        $key = '71675d5b168e40469256080ee9990bad';
        $url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';

        $headers = "Ocp-Apim-Subscription-Key: $key\r\n";
        $options = array ('http' => array ( 'header' => $headers, 'method' => 'GET'));

        foreach ($arQuery as $key => $query) {
            try {
                $context = stream_context_create($options);
                $result = file_get_contents($url . "?q=" . urlencode($query), false, $context);
                $jsonBing[$key]  = json_decode($result);
            } catch (\Throwable $th) {
                $jsonBing[$key]  = [];
            }
        }
        return $jsonBing;
    }
    
    public static function getImagensByGoogleSearch($arQuery,$quantidade){
        $jsonGoogle = [];
        //export const GOOGLE_SEARCH_API = 'https://www.googleapis.com/customsearch/v1?'
        // export const KEY = 'AIzaSyCBGTXUWnPkVsC6aBG_Sz5FC3a_8_4f9PQ'
        // export const CX = '013368185579957015972:twogfhgqu05'
        // export const IMAGE = 'image'
        foreach ($arQuery as $key => $value) {
            try {
                $content = file_get_contents("https://www.googleapis.com/customsearch/v1?key=AIzaSyDPg1--2GhzyY2vYpmQAUBSZuJNAStgFD8&cx=013368185579957015972:twogfhgqu05&searchType=image&num=4&q=".urlencode($value));
                $jsonGoogle[$key] = json_decode($content,true);
            } catch (\Throwable $th) {
                $jsonGoogle[$key]  = [];
            }
        }

        return $jsonGoogle;
    }
}