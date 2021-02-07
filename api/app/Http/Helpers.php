<?php

class Helpers
{
    public static function formatCnpjCpf($value)
    {
        $cnpj_cpf = preg_replace('/\\D/', '', $value);

        if (11 === strlen($cnpj_cpf)) {
            return preg_replace('/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/', '$1.$2.$3-$4', $cnpj_cpf);
        }

        return preg_replace('/(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})/', '$1.$2.$3/$4-$5', $cnpj_cpf);
    }

    public static function validarExt($ext, $arExt)
    {
        if (in_array($ext, $arExt)) {
            return true;
        }

        return false;
    }

    public static function convertdateBr2DB($date)
    {
        if (empty($date)) {
            return null;
        }
        $arDate = explode('/', $date);
        if (count($arDate) <= 1) {
            return $date;
        }

        return date("{$arDate[2]}-{$arDate[1]}-{$arDate[0]}");

        return date('Y-m-d', strtotime(str_replace('-', '/', $date)));
    }

    public static function removerCaracteresEspeciaisEspacos($conteudo)
    {
        return str_replace(['(', ')', '[', ']', '{', '}', '-', ',', '.', '/', '\\', ';', ':', '?', '!', ' ', '°', 'º', "'"], '', $conteudo);
    }

    public static function convertdateBr2DBTs($date)
    {
        return date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $date)));
    }

    public static function removerVazio($controler, $request)
    {
        foreach ($request as $key => $value) {
            if (!empty($value)) {
                $tipo = substr($key, 0, 2);
                $controler->{$key} = $value;
                if ('dt' == $tipo) {
                    $controler->{$key} = Helpers::convertdateBr2DB($value);
                }
            }
        }

        return $controler;
    }

    public static function validarCpf($cpf)
    {
        $cpf = self::removerCaracteresEspeciaisEspacos($cpf);
        $cpf = trim($cpf);
        if (empty($cpf) || 11 != strlen($cpf)) {
            return false;
        }
        $Numero[1] = intval(substr($cpf, 1 - 1, 1));
        $Numero[2] = intval(substr($cpf, 2 - 1, 1));
        $Numero[3] = intval(substr($cpf, 3 - 1, 1));
        $Numero[4] = intval(substr($cpf, 4 - 1, 1));
        $Numero[5] = intval(substr($cpf, 5 - 1, 1));
        $Numero[6] = intval(substr($cpf, 6 - 1, 1));
        $Numero[7] = intval(substr($cpf, 7 - 1, 1));
        $Numero[8] = intval(substr($cpf, 8 - 1, 1));
        $Numero[9] = intval(substr($cpf, 9 - 1, 1));
        $Numero[10] = intval(substr($cpf, 10 - 1, 1));
        $Numero[11] = intval(substr($cpf, 11 - 1, 1));
        $soma = 10 * $Numero[1] + 9 * $Numero[2] + 8 * $Numero[3] + 7 * $Numero[4] + 6 * $Numero[5] + 5 * $Numero[6] + 4 * $Numero[7] + 3 * $Numero[8] + 2 * $Numero[9];
        $soma = $soma - (11 * (intval($soma / 11)));
        if (0 == $soma || 1 == $soma) {
            $resultado1 = 0;
        } else {
            $resultado1 = 11 - $soma;
            if ($resultado1 == $Numero[10]) {
                $soma = $Numero[1] * 11 + $Numero[2] * 10 + $Numero[3] * 9 + $Numero[4] * 8 + $Numero[5] * 7 + $Numero[6] * 6 + $Numero[7] * 5 + $Numero[8] * 4 + $Numero[9] * 3 + $Numero[10] * 2;
                $soma = $soma - (11 * (intval($soma / 11)));
                if (0 == $soma || 1 == $soma) {
                    $resultado2 = 0;
                } else {
                    $resultado2 = 11 - $soma;
                }
                if ($resultado2 == $Numero[11]) {
                    return true;
                }

                return false;
            }

            return false;
        }

        return true;
    }

    public static function processar($controler, $request)
    {
        foreach ($request as $key => $value) {
            $tipo = substr($key, 0, 2);
            $controler->{$key} = (!empty($value)) ? $value : null;
            if ('dt' == $tipo) {
                $controler->{$key} = Helpers::convertdateBr2DB($value);
            }
        }

        return $controler;
    }

    public static function processarColunas($colunas, $request)
    {
        $ar = [];
        foreach ($request as $key => $value) {
            if (in_array($key, $colunas)) {
                $tipo = substr($key, 0, 2);
                $ar[$key] = (!empty($value)) ? $value : null;
                if ('dt' == $tipo) {
                    $ar[$key] = Helpers::convertdateBr2DB($value);
                }
            }
        }

        return $ar;
    }

    public static function processarColunasUpdate($colunas, $request)
    {
        $columns = $colunas->getFillable();

        foreach ($request as $key => $value) {
            if (in_array($key, $columns)) {
                $colunas->{$key} = $value;
            } else {
                if ('fileimg' === $key && !is_null($value) && in_array('img', $columns)) {
                    $colunas->img = $value;
                }
                if ('fileimg_logo' === $key && !is_null($value) && in_array('img_logo', $columns)) {
                    $colunas->img_logo = $value;
                }
            }
        }

        return $colunas;
    }

    public static function saveFileGeneric($file, $folder)
    {
        $doc = $file;
        //Recupera o nome original do arquivo
        $filename = $doc->getClientOriginalName();

        //Recupera a extensão do arquivo
        $extension = $doc->getClientOriginalExtension();
        //Definindo um nome unico para o arquivo
        $name = date('His_Ymd').'_'.str_replace(' ', '', $filename);

        //Diretório onde será salvo os arquivos
        $destinationPath = 'img/'.$folder;
        //Move o arquivo para a pasta indicada
        if ($doc->move($destinationPath, $name)) {
            return ['file' => $name];
        }

        return false;
    }

    public static function salveFile($request, $folder)
    {
        if ($request->hasFile('fileimg')) {
            $doc = $request->file('fileimg');

            //Recupera o nome original do arquivo
            $filename = $doc->getClientOriginalName();

            //Recupera a extensão do arquivo
            $extension = $doc->getClientOriginalExtension();

            //Definindo um nome unico para o arquivo
            $name = date('His_Ymd').'_'.str_replace(' ', '', $filename);

            //Diretório onde será salvo os arquivos
            $destinationPath = 'img/'.$folder;
            //Move o arquivo para a pasta indicada
            if ($doc->move($destinationPath, $name)) {
                return ['file' => $name];
            }
        }

        return false;
    }

    public function getOSClient()
    {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $os_platform = 'Unknown OS Platform';
        $os_array = [
            '/windows/i' => 'Windows',
            '/linux/i' => 'Linux',
            '/iphone/i' => 'iPhone',
            '/ipod/i' => 'iPod',
            '/ipad/i' => 'iPad',
            '/android/i' => 'Android',
        ];

        foreach ($os_array as $regex => $value) {
            if (preg_match($regex, $user_agent)) {
                $os_platform = $value;
            }
        }

        return $os_platform;
    }

    public static function getFirstNameFromUrlClient($request)
    {
        $path = parse_url($request->header('Referer'), PHP_URL_PATH);
        if (!$path) {
            return null;
        }
        $arFolder = explode('/', $path);
        $folder = current(array_filter($arFolder, fn ($value) => !is_null($value) && '' !== $value));

        return $folder ?? null;
    }
}
