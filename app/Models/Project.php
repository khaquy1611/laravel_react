<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\QueryTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{

    use Notifiable, QueryTrait, SoftDeletes;

    protected $fillable = [
        'name',
        'project_catalogue_id',
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
        'province_id',
        'district_id',
        'ward_id',
    ];

    protected $casts = [
        'album' => 'json'
    ];

    public $attributes = [
        'order' => 0,
    ];

    protected $table = 'projects';

    public function project_catalogues(): BelongsToMany{
        return $this->belongsToMany(projectCatalogue::class, 'project_catalogue_project', 'project_id', 'project_catalogue_id')->withTimestamps();
    }
   
    public function tags(){
        return $this->morphToMany(Tag::class, 'taggable');
    }

}
