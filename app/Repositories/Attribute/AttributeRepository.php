<?php   
namespace App\Repositories\Attribute;
use App\Repositories\BaseRepository;
use App\Models\Attribute;


class AttributeRepository extends BaseRepository{

    protected $model;

    public function __construct(
        Attribute $model
    ){
        $this->model = $model;
    }


}
