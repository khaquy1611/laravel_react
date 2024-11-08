<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Traits\QueryTrait;

class AttributeCatalogue extends Model
{

    use Notifiable, QueryTrait;

    protected $fillable = [
        'name',
        'description',
        'publish',
        'model'
    ];

    protected $table = 'attribute_catalogues';

   
    public function attributes()
    {
        return $this->hasMany(Attribute::class, 'attribute_catalogue_id', 'id');
    }
}
