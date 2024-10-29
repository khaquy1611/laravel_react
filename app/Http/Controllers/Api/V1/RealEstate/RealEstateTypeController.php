<?php   
namespace App\Http\Controllers\Api\V1\RealEstate;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\RealEstateTypeResource;
use App\Services\RealEstate\RealEstateTypeService;
use App\Repositories\RealEstate\RealEstateTypeRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\RealEstate\StoreRealEstateTypeRequest;
use App\Http\Requests\RealEstate\UpdateRealEstateTypeRequest;
use App\Enums\Status;

    
class RealEstateTypeController extends Controller
{

    protected $realEstateTypeService;
    protected $realEstateTypeRepository;

    public function __construct(
        RealEstateTypeService $realEstateTypeService,
        RealEstateTypeRepository $realEstateTypeRepository,
    ){
        $this->realEstateTypeService = $realEstateTypeService;
        $this->realEstateTypeRepository = $realEstateTypeRepository;
    }

    
    public function index(Request $request){
        $realEstateTypes = $this->realEstateTypeService->paginate($request);

        return response()->json([
            'real_estate_types' => method_exists($realEstateTypes, 'items') ? RealEstateTypeResource::collection($realEstateTypes->items()) : $realEstateTypes,
            'links' => method_exists($realEstateTypes, 'items') ? $realEstateTypes->linkCollection() : null,
            'current_page' => method_exists($realEstateTypes, 'items') ? $realEstateTypes->currentPage() : null,
            'last_page' => method_exists($realEstateTypes, 'items') ? $realEstateTypes->lastPage() : null
        ], Response::HTTP_OK);
    }

    public function create(StoreRealEstateTypeRequest $request){

        $data = $this->realEstateTypeService->create($request);
        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'real_estate_type' => new RealEstateTypeResource($data['realEstateType'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(UpdateRealEstateTypeRequest $request, $id){
        $data = $this->realEstateTypeService->update($request, $id);
 
        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'real_estate_type' => new RealEstateTypeResource($data['realEstateType']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }


    public function show(Request $request, $id){

        if(empty($id) || $id < 0 ){
            return  $this->returnIfIdValidataFail();
        }

        $realEstateType = $this->realEstateTypeRepository->findById($id);

        if(!$realEstateType){
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Không có dữ liệu phù hợp'
            ], Response::HTTP_NOT_FOUND);
        }else{
            return response()->json(
                new RealEstateTypeResource($realEstateType)
            );
        }
    }


    public function destroy($id, Request $request){

        if(empty($id) || $id < 0 ){
            return $this->returnIfIdValidataFail();
        }

        $realEstateType = $this->realEstateTypeRepository->findById($id);

        if(!$realEstateType){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->realEstateTypeService->delete($id)){
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
        $respository = 'App\Repositories\RealEstate\RealEstateTypeRepository';

        if($this->realEstateTypeService->updateByField($request, $id, $respository)){
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
