<?php   
namespace App\Http\Controllers\Api\V1\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use App\Services\User\UserService;
use App\Repositories\User\UserRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\ChangePasswordUserRequest;
use App\Enums\Status;
use App\Models\User;
    
class UserController extends Controller
{

    protected $userService;
    protected $userRepository;

    public function __construct(
        UserService $userService,
        UserRepository $userRepository,
    ){
        $this->userService = $userService;
        $this->userRepository = $userRepository;
       
    }
   
    public function index(Request $request){
        $users = $this->userService->paginate($request);
        return response()->json([
            'users' => method_exists($users, 'items') ? UserResource::collection($users->items()) : $users,
            'links' => method_exists($users, 'items') ? $users->linkCollection() : null,
            'current_page' => method_exists($users, 'items') ? $users->currentPage() : null,
            'last_page' => method_exists($users, 'items') ? $users->lastPage() : null,
            'total' => method_exists($users, 'items') ? $users->total() : null,
        ], Response::HTTP_OK);
    }

    public function create(StoreUserRequest $request){

        $auth = auth()->user();
        $data = $this->userService->create($request, $auth);
        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'user' => new UserResource($data['user'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    private function baseUpdate($request, $id){
        $auth = auth()->user();
        $data = $this->userService->update($request, $id, $auth);
 
        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'user' => new UserResource($data['user']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }

    public function update(UpdateUserRequest $request, $id){
       return $this->baseUpdate($request, $id);
    }

    public function resetPassword(ChangePasswordUserRequest $request, $id){
        return $this->baseUpdate($request, $id);
    }


    public function show(Request $request, $id){

        if(empty($id) || $id < 0 ){
            return  $this->returnIfIdValidataFail();
        }

        $user = $this->userRepository->findById($id);

        if(!$user){
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Không có dữ liệu phù hợp'
            ], Response::HTTP_NOT_FOUND);
        }else{
            return response()->json(
                new UserResource($user)
            );
        }
    }


    public function destroy($id, Request $request){

        if(empty($id) || $id < 0 ){
            return $this->returnIfIdValidataFail();
        }

        $user = $this->userRepository->findById($id);

        if(!$user){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->userService->delete($id)){
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
        $respository = 'App\Repositories\User\UserRepository';
        if($this->userService->updateByField($request, $id, $respository)){
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