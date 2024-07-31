<?php

namespace App\Http\Controllers\Api\V1;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\User\UserService;
use App\Repositories\User\UserRepository;

class UserController extends Controller
{
    protected $userServices;
    protected $userRepository;
    public function __construct(UserService $userServices, UserRepository $userRepository ) {
       $this->userServices = $userServices;
       $this->userRepository = $userRepository;
    }

    public function index(Request $request) {
        $user = $this->userServices->paginate();
        return response()->json([
            'users' => $user
        ]);
    }
}