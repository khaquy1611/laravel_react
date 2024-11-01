<?php   
namespace App\Repositories\Project;
use App\Repositories\BaseRepository;
use App\Models\ProjectCatalogue;


class ProjectCatalogueRepository extends BaseRepository{

    protected $model;

    public function __construct(
        ProjectCatalogue $model
    ){
        $this->model = $model;
    }


}
