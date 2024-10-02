<?php 
namespace App\Repositories\UserCatalogue;
use App\Repositories\BaseRepository;
use App\Models\UserCatalogue;

class UserCatalogueRepository extends BaseRepository {
    protected $model;
    public function __construct(UserCatalogue $model) {
        $this->model = $model;
    }
}