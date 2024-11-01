<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\QueryTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProjectCatalogue extends Model
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

    protected $table = 'project_catalogues';

   
    public static function hasChildren($id = 0){
        $projectCatalogue = projectCatalogue::find($id);
        if($projectCatalogue->rgt - $projectCatalogue->lft !== 1){
            return false;
        }
        return true;
    }

    public function projects(): BelongsToMany{
        return $this->belongsToMany(Project::class, 'project_catalogue_project', 'project_catalogue_id', 'project_id');
    }

}