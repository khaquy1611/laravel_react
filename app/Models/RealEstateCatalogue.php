<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\QueryTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RealEstateCatalogue extends Model
{

    use Notifiable, QueryTrait, SoftDeletes;

    protected $fillable = [
        'name',
        'parent_id',
        'lft',
        'rgt',
        'level',
        'description',
        'content',
        'album',
        'image',
        'icon',
        'follow',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'canonical',
        'publish',
        'order',
        'user_id',
    ];

    protected $casts = [
        'album' => 'json'
    ];

    public $attributes = [
        'order' => 0,
        'lft' => 0,
        'rgt' => 0,
        'level' => 0,
        'publish' => 2,
        'follow' => 2,
    ];

    protected $table = 'real_estate_catalogues';

   
    public static function hasChildren($id = 0){
        $realEstateCatalogue = RealEstateCatalogue::find($id);
        if($realEstateCatalogue->rgt - $realEstateCatalogue->lft !== 1){
            return false;
        }
        return true;
    }

    public function real_estates(): BelongsToMany{
        return $this->belongsToMany(RealEstate::class, 'real_estate_catalogue_real_estate', 'real_estate_catalogue_id', 'real_estate_id');
    }

}
