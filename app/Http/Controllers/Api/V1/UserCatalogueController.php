<?php   
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\UserCatalogue\StoreUserCatalogueRequest;
use App\Http\Resources\UserCatalogueResource;
use App\Services\User\UserCatalogueService;
use App\Repositories\User\UserCatalogueRepository;
use App\Enums\Status;


    
class UserCatalogueController extends Controller
{

    protected $userCatalogueService;
    protected $userCatalogueRepository;

    public function __construct(
        UserCatalogueService $userCatalogueService,
        UserCatalogueRepository $userRepository,
    ){
        $this->userCatalogueService = $userCatalogueService;
        $this->userCatalogueRepository = $userRepository;
    }

    
    public function index(Request $request){
        $userCatalogues = $this->userCatalogueService->paginate($request);

        return response()->json([
            'user_catalogues' => method_exists($userCatalogues, 'items') ? UserCatalogueResource::collection($userCatalogues->items()) : $userCatalogues,
            'links' => method_exists($userCatalogues, 'items') ? $userCatalogues->linkCollection() : null,
            'current_page' => method_exists($userCatalogues, 'items') ? $userCatalogues->currentPage() : null,
            'last_page' => method_exists($userCatalogues, 'items') ? $userCatalogues->lastPage() : null,
            'total' => method_exists($userCatalogues, 'items') ? $userCatalogues->total() : null,
        ], Response::HTTP_OK);
    }

    public function create(StoreUserCatalogueRequest $request){

        $data = $this->userCatalogueService->create($request);
        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'userCatalogue' => new UserCatalogueResource($data['userCatalogue'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(StoreUserCatalogueRequest $request, $id){
        $data = $this->userCatalogueService->update($request, $id);
 
        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'userCatalogue' => new UserCatalogueResource($data['userCatalogue']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }


    public function show(Request $request, $id){

        if(empty($id) || $id < 0 ){
            return  $this->returnIfIdValidataFail();
        }

        $user = $this->userCatalogueRepository->findById($id);

        if(!$user){
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Không có dữ liệu phù hợp'
            ], Response::HTTP_NOT_FOUND);
        }else{
            return response()->json(
                new UserCatalogueResource($user)
            );
        }
    }


    public function destroy($id, Request $request){

        if(empty($id) || $id < 0 ){
            return $this->returnIfIdValidataFail();
        }

        $userCatalogue = $this->userCatalogueRepository->findById($id);

        if(!$userCatalogue){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->userCatalogueService->delete($id)){
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
        $respository = 'App\Repositories\User\UserCatalogueRepository';

        if($this->userCatalogueService->updateByField($request, $id, $respository)){
            return response()->json([
                'message' => 'Cập nhật dữ liệu thành công',
            ], Response::HTTP_OK); 
        }

        return response()->json([
            'message' => 'Cập nhật dữ liệu không thành công',
        ], Response::HTTP_INTERNAL_SERVER_ERROR); 
    }

    private function returnIfIdValidataFail(){
        return response()->json([
            'message' => 'Xóa bản ghi thành công',
            'code' => Status::SUCCESS
         ], Response::HTTP_OK); 
    }

}