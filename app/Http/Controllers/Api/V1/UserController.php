<?php

namespace App\Http\Controllers\Api\V1;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\User\UserService;
use App\Repositories\User\UserRepository;
use App\Http\Requests\UpdateStatusByFieldRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Enums\Status;

class UserController extends Controller
{
    protected $userServices;
    protected $userRepository;
    public function __construct(UserService $userServices, UserRepository $userRepository ) {
       $this->userServices = $userServices;
       $this->userRepository = $userRepository;
    }

    public function index(Request $request) {
        $users = $this->userServices->paginate($request);
        return response()->json([
            'users' => UserResource::collection($users->items()) ,
            'links' => $users->linkCollection(),
            'current_page' => $users->currentPage(),
            'last_page' =>  $users->lastPage(),
            'total' => $users->total(),
        ],Response::HTTP_OK);
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

    public function create(StoreUserRequest $request){

        $auth = auth()->user();
        $data = $this->userServices->create($request, $auth);
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

    public function updateStatusByField(UpdateStatusByFieldRequest $request, $id) {
        $repository = 'App\Repositories\User\UserRepository';
        if ($this->userServices->updateByField($request, $id, $repository)) {
            return response()->json([
                'message' => 'Cập nhập dữ liệu thành công',

            ], Response::HTTP_OK);
        }
        return response()->json([
            'message' => 'Cập nhập dữ liệu không thành công',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}