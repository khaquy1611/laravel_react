<?php 
namespace App\Services\User;
use App\Services\BaseService;
use App\Repositories\User\UserRepository;

class UserService extends BaseService {
    protected $userRepository;
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }
    private function paginateArgument($request) {
        return [
            'perPage' => $request->input('perPage') ?? 20,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name', 'email', 'address', 'phone']
            ],
            'condition' => [
                'publish' => $request->integer('publish'),
                // 'user_catalogue_id' => $request->integer('user_catalogue_id')
            ],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',', $request->input('sort')) : ['id', 'desc'],
        ];
    }
    public function paginate($request) { 
        $argument = $this->paginateArgument($request);
        $users = $this->userRepository->pagination([...$argument]);
        return $users;
    }
}