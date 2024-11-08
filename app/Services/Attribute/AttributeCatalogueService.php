<?php   
namespace App\Services\Attribute;
use App\Services\BaseService;
use App\Repositories\Attribute\AttributeCatalogueRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;


class AttributeCatalogueService extends BaseService{

    protected $attributeCatalogueRepository;
    protected $fileUploader;

    public function __construct(
        AttributeCatalogueRepository $attributeCatalogueRepository,
    ){
        $this->attributeCatalogueRepository = $attributeCatalogueRepository;
    }

    private function paginateAgrument($request){
        return [
            'perPage' => $request->input('perPage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name', 'description']
            ],
            'condition' => [
                'publish' => $request->integer('publish'),
            ],
            // 'relationCount' => ['attributes'],
            // 'relation' => ['attributes'],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['id', 'desc'],
        ];
    }

    public function paginate($request){

        $agrument = $this->paginateAgrument($request);

        $attributeCatalogues = $this->attributeCatalogueRepository->pagination([...$agrument]);
        return $attributeCatalogues;
    }


    public function create($request){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializePayload($request, $except)->getPayload();

            $attributeCatalogue = $this->attributeCatalogueRepository->create($payload);
            DB::commit();

            return [
                'attributeCatalogue' => $attributeCatalogue,
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

    public function update($request, $id){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializePayload($request, $except)->getPayload();

            $attributeCatalogue = $this->attributeCatalogueRepository->update($id, $payload);
            DB::commit();
            return [
                'attributeCatalogue' => $attributeCatalogue,
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

    public function delete($id){
        DB::beginTransaction();
        try {
            $this->attributeCatalogueRepository->delete($id);
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