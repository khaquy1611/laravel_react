<?php   
namespace App\Repositories\Attribute;
use App\Repositories\BaseRepository;
use App\Models\AttributeCatalogue;


class AttributeCatalogueRepository extends BaseRepository{

    protected $model;

    public function __construct(
        AttributeCatalogue $model
    ){
        $this->model = $model;
    }


}
