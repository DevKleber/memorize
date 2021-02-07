<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $table = 'usuario';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nome', 'email', 'usuario', 'password', 'bo_ativo'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function recoverPassword($request)
    {
        $employee = \App\Funcionario::getEmployeeByEmail($request['email']);
        if (!$employee) {
            return response(['error' => 'E-mail ou cpf incorreto'], 400);
        }

        $funcionario = \App\Funcionario::find($employee->id_pessoa);
        if (!$funcionario) {
            return response(['response' => 'Funcionario Não encontrado'], 400);
        }
        $password = Str::random(8);
        $employee['password'] = $password;
        $funcionario->password = \Hash::make(($password));
        $funcionario->bo_mudar_senha = true;

        if (!$funcionario->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }
        \App\Email::sendEmailNewCount($employee);

        return response(['response' => 'Atualizado com sucesso']);
    }

    public static function changePassword($request, $id_pessoa)
    {
        $funcionario = \App\Funcionario::find($id_pessoa);

        if (!\Hash::check($request['currentPassword'], $funcionario->password)) {
            return response(['response' => 'Senha incorreta'], 400);
        }

        $funcionario->password = \Hash::make(($request['newPassword']));
        if (!$funcionario->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return response(['response' => 'Atualizado com sucesso']);
    }

    public static function getWorstPassword()
    {
        return [
            '123456',
            '123456789',
            '123abc',
            'qwerty',
            'password',
            '111111',
            '12345678',
            'abc123',
            '1234567',
            'password1',
            '12345',
            '1234567890',
            '123123',
            '000000',
            'iloveyou',
            '1234',
            '1q2w3e4r5t',
            'qwertyuiop',
            '123',
            'monkey',
            'dragon',
        ];
    }
}
