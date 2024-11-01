<?php   
namespace App\Http\Controllers\Api\V1\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\ProjectResource;
use App\Services\Project\ProjectService;
use App\Repositories\Project\ProjectRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Enums\Status;

    
class ProjectController extends Controller
{

    protected $projectService;
    protected $projectRepository;
    protected $auth;

    public function __construct(
        ProjectService $projectService,
        ProjectRepository $projectRepository,
    ){
        $this->projectService = $projectService;
        $this->projectRepository = $projectRepository;
        $this->auth = auth()->user();
    }


    
    public function index(Request $request){
        $projects = $this->projectService->paginate($request);
        
        return response()->json([
            'projects' => method_exists($projects, 'items') ? ProjectResource::collection($projects->items()) : $projects,
            'links' => method_exists($projects, 'items') ? $projects->linkCollection() : null,
            'current_page' => method_exists($projects, 'items') ? $projects->currentPage() : null,
            'last_page' => method_exists($projects, 'items') ? $projects->lastPage() : null
        ], Response::HTTP_OK);
    }

    public function create(StoreProjectRequest $request){

        $auth = auth()->user();
        $data = $this->projectService->create($request, $auth);


        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'project' => new ProjectResource($data['project'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(UpdateProjectRequest $request, $id){
        $auth = auth()->user();
        $data = $this->projectService->update($request, $id, $auth);

        return $data;

        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'project' => new ProjectResource($data['project']),
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


            $project = $this->projectRepository->findById($id);

            return response()->json(
                new ProjectResource($project)
            );


        } catch (\Exception $th) {
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Network Error'
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function destroy($id, Request $request){
        $project = $this->projectRepository->findById($id);

        if(!$project){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->projectService->delete($id, $this->auth)){
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
        $respository = 'App\Repositories\Project\ProjectRepository';
        if($this->projectService->updateByField($request, $id, $respository)){
            return response()->json([
                'message' => 'Cập nhật dữ liệu thành công',
            ], Response::HTTP_OK); 
        }

        return response()->json([
            'message' => 'Cập nhật dữ liệu không thành công',
        ], Response::HTTP_INTERNAL_SERVER_ERROR); 
    }

   

}