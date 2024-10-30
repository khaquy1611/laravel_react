<?php   
namespace App\Services\RealEstate;
use App\Services\BaseService;
use App\Repositories\RealEstate\RealEstateCatalogueRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;
use App\Classes\Nested;


class RealEstateCatalogueService extends BaseService{

    protected $realEstateCatalogueRepository;
    protected $fileUploader;
    protected $files = ['image', 'icon'];
    protected $except = [];
    protected $nested;

    public function __construct(
        RealEstateCatalogueRepository $realEstateCatalogueRepository,
    ){
        $this->realEstateCatalogueRepository = $realEstateCatalogueRepository;

        $this->nested =  new Nested([
            'table' => 'real_estate_catalogues'
        ]);
        // parent
    }


    private function paginateAgrument($request){
        return [
            'perPage' => $request->input('perPage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name', 'description', 'content']
            ],
            'condition' => [
                'publish' => $request->integer('publish'),
            ],
            // 'relationCount' => ['users'],
            // 'relation' => ['users'],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['lft', 'asc'],
        ];
    }

    public function paginate($request){

        $agrument = $this->paginateAgrument($request);

        $realEstateCatalogues = $this->realEstateCatalogueRepository->pagination([...$agrument]);
        return $realEstateCatalogues;
    }

    private function imageAgrument(){
        return [
          'customFolder' =>   ['real_estate_catalogues'],
          'imageType' => 'image'
        ];
    }

   

    private function initializeRequest($request, $auth, $except){
        return $this->initializePayload($request, $except)
                    ->handleUserId($auth)
                    ->processFiles($request, $auth, $this->files, ...$this->imageAgrument())
                    ->processCanonical($request)
                    ->processAlbum($request, $auth, $this->imageAgrument()['customFolder'])
                    ->getPayload();
    }

    public function create($request, $auth){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializeRequest($request, $auth, $except);


            $realEstateCatalogue = $this->realEstateCatalogueRepository->create($payload);

            if($realEstateCatalogue->id > 0){
                $this->nestedset($auth);
            }

            DB::commit();
            return [
                'realEstateCatalogue' => $realEstateCatalogue,
                'code' => Status::SUCCESS
            ];
        } catch (\Exception $e) {

            DB::rollback();
            return [
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ];
        }
    }

    public function update($request, $id, $auth){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializeRequest($request, $auth, $except);
            $realEstateCatalogue = $this->realEstateCatalogueRepository->update($id, $payload);
            $this->nestedset($auth); 
            DB::commit();
            return [
                'realEstateCatalogue' => $realEstateCatalogue,
                'code' => Status::SUCCESS
            ];
        } catch (\Exception $e) {
            DB::rollback();
            return [
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ];
        }
    }

    public function delete($id, $auth){
        DB::beginTransaction();
        try {
            $this->realEstateCatalogueRepository->delete($id);
            $this->nestedset($auth); 
            DB::commit();
            return [
                'code' => Status::SUCCESS
            ];
        } catch (\Exception $e) {
            DB::rollback();
            return [
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ];
        }
    }
    
}