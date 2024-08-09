<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Traits\QueryTrait;

class UserCatalogue extends Model
{

    use Notifiable, QueryTrait;

    protected $fillable = [
        'name',
        'description',
        'publish'
    ];

    protected $table = 'user_catalogues';

   
    public function users()
    {
        return $this->hasMany(User::class, 'user_catalogue_id', 'id');
    }
}