<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\QueryTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{

    use Notifiable, QueryTrait, SoftDeletes;

    protected $fillable = [
        'name',
        'canonical',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'publish',
        'user_id',
    ];

  
    protected $table = 'tags';


    public function attributes(){
        return [
            'publish' => 2,
        ];
    }

   
    public function posts(){
        return $this->morphToMany(Post::class, 'taggable', 'taggables', 'tag_id', 'taggable_id');
    }

}