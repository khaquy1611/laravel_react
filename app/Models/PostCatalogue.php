<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\QueryTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PostCatalogue extends Model
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
    ];

    protected $table = 'post_catalogues';

   
    public static function hasChildren($id = 0){
        $postCatalogue = PostCatalogue::find($id);
        if($postCatalogue->rgt - $postCatalogue->lft !== 1){
            return false;
        }
        return true;
    }

    public function posts(): BelongsToMany{
        return $this->belongsToMany(Post::class, 'post_catalogue_post', 'post_catalogue_id', 'post_id');
    }

}