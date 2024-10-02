<?php   
namespace App\Services\UserCatalogue;
use App\Services\BaseService;
use App\Repositories\UserCatalogue\UserCatalogueRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;


class UserCatalogueService extends BaseService{

    protected $userCatalogueRepository;
    protected $fileUploader;

    public function __construct(
        UserCatalogueRepository $userCatalogueRepository,
    ){
        $this->userCatalogueRepository = $userCatalogueRepository;
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
            'relationCount' => ['users'],
            // 'relation' => ['users'],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['id', 'desc'],
        ];
    }

    public function paginate($request){

        $agrument = $this->paginateAgrument($request);

        $userCatalogues = $this->userCatalogueRepository->pagination([...$agrument]);
        return $userCatalogues;
    }


    public function create($request){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializePayload($request, $except)->getPayload();

            $userCatalogue = $this->userCatalogueRepository->create($payload);
            DB::commit();

            return [
                'userCatalogue' => $userCatalogue,
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

            $userCatalogue = $this->userCatalogueRepository->update($id, $payload);
            DB::commit();
            return [
                'userCatalogue' => $userCatalogue,
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
            $this->userCatalogueRepository->delete($id);
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