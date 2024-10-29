<?php   
namespace App\Services\RealEstate;
use App\Services\BaseService;
use App\Repositories\RealEstate\RealEstateTypeRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;


class RealEstateTypeService extends BaseService{

    protected $realEstateTypeRepository;

    public function __construct(
        RealEstateTypeRepository $realEstateTypeRepository,
    ){
        $this->realEstateTypeRepository = $realEstateTypeRepository;
    }

    private function paginateAgrument($request){
        return [
            'perPage' => $request->input('perPage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name']
            ],
            'condition' => [
                'publish' => $request->integer('publish'),
            ],
            // 'relationCount' => ['posts'],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['id', 'desc'],
        ];
    }

    public function paginate($request){

        $agrument = $this->paginateAgrument($request);

        $realEstateTypes = $this->realEstateTypeRepository->pagination([...$agrument]);
        return $realEstateTypes;
    }


    public function create($request){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializePayload($request, $except)->processCanonical()->getPayload();

            $realEstateType = $this->realEstateTypeRepository->create($payload);
            DB::commit();

            return [
                'realEstateType' => $realEstateType,
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

    public function update($request, $id){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initializePayload($request, $except)->processCanonical()->getPayload();

            $realEstateType = $this->realEstateTypeRepository->update($id, $payload);
            DB::commit();
            return [
                'realEstateType' => $realEstateType,
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
            $this->realEstateTypeRepository->delete($id);
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