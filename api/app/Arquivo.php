<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class Arquivo extends Model
{
    public static function saveFile($file, $folder)
    {
        return self::send($file, $folder);
    }

    public static function send($file, $folder)
    {
        if (null == $folder) {
            $folder = 'default';
        }

        return self::crop($file, $folder);
    }

    public static function formataIsImage($request)
    {
        $type = current(explode('/', $request->getMimeType()));
        if ('image' != $type) {
            return false;
        }

        return true;
    }

    private static function crop($file, $path)
    {
        $type = current(explode('/', $file->getMimeType()));
        if ('image' != $type) {
            return false;
        }

        $arquivo = $file->getClientOriginalName();
        $filename = Str::random(10).date('dmYHis').auth('api')->user()->id;
        $extension = pathinfo($arquivo, PATHINFO_EXTENSION);

        $name = storage_path().'/app/public/'.$path.'/'.$filename.'_min.'.$extension;

        if (Image::make($file)->fit(200, 200)->save($name)) {
            $caminho = 'public/storage/'.$path.'/'.$filename.'_min.'.$extension;
            if ($caminho) {
                return $caminho;
            }
        }

        return false;
    }
}
