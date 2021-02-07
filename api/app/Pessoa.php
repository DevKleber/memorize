<?php

namespace App;

use Helpers;
use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    protected $table = 'pessoa.pessoa';
    protected $primaryKey = 'id_pessoa';
    protected $fillable = ['id_pessoa', 'no_pessoa', 'created_at', 'updated_at', 'ds_usuario', 'id_arquivo'];

    public static function updatePerson($request, $id)
    {
        $pessoa = \App\Pessoa::find($id);

        if (!$pessoa) {
            return response(['response' => 'Pessoa Não encontrado'], 400);
        }
        $pessoa = Helpers::processarColunasUpdate($pessoa, $request->all());

        if (!$pessoa->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return true;
    }

    public static function insertPerson($request)
    {
        $pessoa = \App\Pessoa::create($request->all());
        if (!$pessoa) {
            return  response(['response' => 'Erro ao salvar Pessoa'], 400);
        }

        return $pessoa;
    }

    public static function getAvatar($id_pessoa)
    {
        return self::where('id_pessoa', $id_pessoa)
            ->join('sistema.arquivo as arquivo', 'arquivo.id_arquivo', '=', 'pessoa.pessoa.id_arquivo')
            ->first()
    ;
    }
}
