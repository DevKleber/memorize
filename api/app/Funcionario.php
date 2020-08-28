<?php

namespace App;

use Helpers;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $table = 'usuario';
    protected $primaryKey = 'id';
    protected $fillable = ['nome', 'email', 'usuario', 'password', 'bo_ativo'];

    public static function getEmployeeByEmail($email)
    {
        return self::where('email', $email)->first();
    }

    public static function getEmployeeById($id)
    {
        return self::where('id', $id)->first();
    }

    public static function getEmployee()
    {
        $dados = self::where('bo_ativo', true)->get();

        return ['dados' => $dados];
    }

    public static function updateEmployee($request, $id)
    {
        $funcionario = self::find($id);

        if (!$funcionario) {
            return response(['response' => 'Funcionario Não encontrado'], 400);
        }

        $funcionario = Helpers::processarColunasUpdate($funcionario, $request->all());

        if (!$funcionario->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return true;
    }
}
