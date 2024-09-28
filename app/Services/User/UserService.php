<?php 
namespace App\Services\User;
use App\Services\BaseService;
use App\Repositories\User\UserRepository;
use DB;
use App\Enums\Status;

class UserService extends BaseService {
    protected $userRepository;
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }
    private function paginateAgrument($request){
        return [
            'perPage' => $request->input('perPage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name', 'email', 'address', 'phone']
            ],
            'condition' => [
                'publish' => $request->integer('publish'),
                'user_catalogue_id' => $request->integer('user_catalogue_id'),
            ],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['id', 'desc'],
        ];
    }

    public function paginate($request){

        $agrument = $this->paginateAgrument($request);

        $users = $this->userRepository->pagination([...$agrument]);
        return $users;
    }


    public function create($request, $auth){
        DB::beginTransaction();
        try {
            $except = ['confirmPassword'];
            $payload = $this->request($request, $auth, $except);

            $user = $this->userRepository->create($payload);
            DB::commit();

            return [
                'user' => $user,
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
            $except = ['confirmPassword'];
            $payload = $this->request($request, $auth, $except);

            $user = $this->userRepository->update($id, $payload);
            DB::commit();
            return [
                'user' => $user,
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

    public function delete($id){
        DB::beginTransaction();
        try {
            $this->userRepository->delete($id);
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