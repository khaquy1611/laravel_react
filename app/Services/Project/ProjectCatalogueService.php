<?php   
namespace App\Services\Project;
use App\Services\BaseService;
use App\Repositories\Project\ProjectCatalogueRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;
use App\Classes\Nested;


class ProjectCatalogueService extends BaseService{

    protected $projectCatalogueRepository;
    protected $fileUploader;
    protected $files = ['image', 'icon'];
    protected $except = [];
    protected $nested;

    public function __construct(
        ProjectCatalogueRepository $projectCatalogueRepository,
    ){
        $this->projectCatalogueRepository = $projectCatalogueRepository;

        $this->nested =  new Nested([
            'table' => 'project_catalogues'
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

        $projectCatalogues = $this->projectCatalogueRepository->pagination([...$agrument]);
        return $projectCatalogues;
    }

    private function imageAgrument(){
        return [
          'customFolder' =>   ['project_catalogues'],
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

            $projectCatalogue = $this->projectCatalogueRepository->create($payload);
            
            if($projectCatalogue->id > 0){
                $this->nestedset($auth);
            }

            DB::commit();
            return [
                'projectCatalogue' => $projectCatalogue,
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
            $projectCatalogue = $this->projectCatalogueRepository->update($id, $payload);
            $this->nestedset($auth); 
            DB::commit();
            return [
                'projectCatalogue' => $projectCatalogue,
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
            $this->projectCatalogueRepository->delete($id);
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