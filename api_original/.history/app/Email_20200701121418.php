<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'pessoa.email';
    protected $primaryKey = 'id_email';
    protected $fillable = ['id_email', 'id_tipoemail', 'ee_email', 'created_at', 'updated_at'];
}
