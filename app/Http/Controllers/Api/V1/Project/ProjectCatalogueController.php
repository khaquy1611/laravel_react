<?php   
namespace App\Http\Controllers\Api\V1\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\ProjectCatalogueResource;
use App\Services\Project\ProjectCatalogueService;
use App\Repositories\Project\ProjectCatalogueRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\Project\StoreProjectCatalogueRequest;
use App\Http\Requests\Project\DeleteProjectCatalogueRequest;
use App\Enums\Status;

    
class ProjectCatalogueController extends Controller
{

    protected $projectCatalogueService;
    protected $projectCatalogueRepository;
    protected $auth;

    public function __construct(
        ProjectCatalogueService $projectCatalogueService,
        ProjectCatalogueRepository $projectRepository,
    ){
        $this->projectCatalogueService = $projectCatalogueService;
        $this->projectCatalogueRepository = $projectRepository;
        $this->auth = auth()->user();
    }


    
    public function index(Request $request){
        $projectCatalogues = $this->projectCatalogueService->paginate($request);

        return response()->json([
            'project_catalogues' => method_exists($projectCatalogues, 'items') ? ProjectCatalogueResource::collection($projectCatalogues->items()) : $projectCatalogues,
            'links' => method_exists($projectCatalogues, 'items') ? $projectCatalogues->linkCollection() : null,
            'current_page' => method_exists($projectCatalogues, 'items') ? $projectCatalogues->currentPage() : null,
            'last_page' => method_exists($projectCatalogues, 'items') ? $projectCatalogues->lastPage() : null
        ], Response::HTTP_OK);
    }

    public function create(Request $request){
        $auth = auth()->user();
        $data = $this->projectCatalogueService->create($request, $auth);
        return $data;


        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'projectCatalogue' => new ProjectCatalogueResource($data['projectCatalogue'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(Request $request, $id){
        $auth = auth()->user();
        $data = $this->projectCatalogueService->update($request, $id, $auth);

        // return $data;

        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'projectCatalogue' => new ProjectCatalogueResource($data['projectCatalogue']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }


    public function show(Request $request, $id){
        try {
           
            if(!$id){
                return response()->json([
                    'code' => Status::ERROR,
                    'message' => 'Không tìm thấy dữ liệu phù hợp'
                ], Response::HTTP_NOT_FOUND);
            }


            $projectCatalogue = $this->projectCatalogueRepository->findById($id);

            return response()->json(
                new ProjectCatalogueResource($projectCatalogue)
            );


        } catch (\Exception $th) {
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Network Error'
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function destroy($id, DeleteProjectCatalogueRequest $request){
        $projectCatalogue = $this->projectCatalogueRepository->findById($id);

        if(!$projectCatalogue){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->projectCatalogueService->delete($id, $this->auth)){
            return response()->json([
                'message' => 'Xóa bản ghi thành công',
                'code' => Status::SUCCESS
             ], Response::HTTP_OK); 
        }

        return response()->json([
            'message' => 'Network Error',
            'code' => Status::ERROR
         ], Response::HTTP_INTERNAL_SERVER_ERROR); 
    }

    public function updateStatusByField(UpdateByFieldRequest $request, $id){
        $respository = 'App\Repositories\Project\projectCatalogueRepository';
        if($this->projectCatalogueService->updateByField($request, $id, $respository)){
            return response()->json([
                'message' => 'Cập nhật dữ liệu thành công',
            ], Response::HTTP_OK); 
        }

        return response()->json([
            'message' => 'Cập nhật dữ liệu không thành công',
        ], Response::HTTP_INTERNAL_SERVER_ERROR); 
    }


}