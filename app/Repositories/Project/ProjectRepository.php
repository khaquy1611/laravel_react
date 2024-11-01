<?php   
namespace App\Repositories\Project;
use App\Repositories\BaseRepository;
use App\Models\Project;


class ProjectRepository extends BaseRepository{

    protected $model;

    public function __construct(
        Project $model
    ){
        $this->model = $model;
    }


}
