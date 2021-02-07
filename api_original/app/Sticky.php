<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sticky extends Model
{
    protected $table = 'sticky';
    protected $primaryKey = 'id';
    protected $fillable = ['frente', 'verso', 'imagem', 'created_at', 'updated_at', 'id_categoria', 'id_usuario', 'bo_ativo'];
}
