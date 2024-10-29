<?php   
namespace App\Repositories\RealEstate;
use App\Repositories\BaseRepository;
use App\Models\RealEstateCatalogue;


class RealEstateCatalogueRepository extends BaseRepository{

    protected $model;

    public function __construct(
        RealEstateCatalogue $model
    ){
        $this->model = $model;
    }


}
