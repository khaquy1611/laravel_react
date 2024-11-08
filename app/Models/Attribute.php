<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\QueryTrait;


class Attribute extends Model
{
    use QueryTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'canonical',
        'description',
        'publish',
        'attribute_catalogue_id',
    ];

    public $attributes = [
        'publish' => 2,
    ];


    public function attribute_catalogues(){
        return $this->belongsTo(AttributeCatalogue::class, 'attribute_catalogue_id', 'id');
    }


}