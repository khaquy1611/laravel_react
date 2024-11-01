<?php   
namespace App\Services\Project;
use App\Services\BaseService;
use App\Repositories\Project\ProjectRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;
use App\Classes\Nested;


class ProjectService extends BaseService{

    protected $projectRepository;
    protected $fileUploader;
    protected $files = ['image', 'icon'];
    protected $except = [];
    protected $nested;

    public function __construct(
        ProjectRepository $projectRepository,
    ){
        $this->projectRepository = $projectRepository;
        parent::__construct('project');
    }

    private function whereHas($request){
        return [
            $this->model.'_catalogues' => [
                $this->whereHasCatalogue($request),
            ],
        ];
    }

    private function paginateAgrument($request){
        return [
            'perPage' => $request->input('perPage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name', 'description', 'content']
            ],
            // 'condition' => [
            //     'publish' => $request->integer('publish'),
            //     'province_id' => $request->input('province_id'),
            //     'district_id' => $request->input('district_id'),
            //     'ward_id' => $request->input('ward_id')
            // ],
            'whereHas' => $this->whereHas($request),
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['id', 'desc'],
        ];
    }

    public function paginate($request){
        $agrument = $this->paginateAgrument($request);
        // dd($agrument);

        $projects = $this->projectRepository->pagination([...$agrument]);
        return $projects;
    }

    private function imageAgrument(){
        return [
          'customFolder' =>   ['projects'],
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
            $except = ['catalogues'];
            $payload = $this->initializeRequest($request, $auth, $except);
            $project = $this->projectRepository->create($payload);
            if($project->id > 0){
                $this->createCatRelation($request, $project, 'project');
                $this->createTagRelation($request, $project);
            }

            DB::commit();
            return [
                'project' => $project,
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

            $project = $this->projectRepository->update($id, $payload);

            if($project){
                $detachArray = ['project_catalogues', 'tags'];
                $this->detachRelation($project, $detachArray);
                $this->createCatRelation($request, $project, 'project');
                $this->createTagRelation($request, $project);
            }

            DB::commit();
            return [
                'project' => $project,
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
            $this->projectRepository->delete($id);
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