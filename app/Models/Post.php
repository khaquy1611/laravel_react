<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\QueryTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{

    use Notifiable, QueryTrait, SoftDeletes;

    protected $fillable = [
        'name',
        'post_catalogue_id',
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
    ];

    protected $table = 'posts';

    public function post_catalogues(): BelongsToMany{
        return $this->belongsToMany(PostCatalogue::class, 'post_catalogue_post', 'post_id', 'post_catalogue_id')->withTimestamps();
    }
   
    public function tags(){
        return $this->morphToMany(Tag::class, 'taggable');
    }

}