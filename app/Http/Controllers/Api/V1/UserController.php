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