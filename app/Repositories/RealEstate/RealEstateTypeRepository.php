<?php   
namespace App\Repositories\RealEstate;
use App\Repositories\BaseRepository;
use App\Models\RealEstateType;


class RealEstateTypeRepository extends BaseRepository{

    protected $model;

    public function __construct(
        RealEstateType $model
    ){
        $this->model = $model;
    }

}
