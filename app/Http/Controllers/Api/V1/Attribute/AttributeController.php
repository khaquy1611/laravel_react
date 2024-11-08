<?php   
namespace App\Http\Controllers\Api\V1\Attribute;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\AttributeResource;
use App\Services\Attribute\AttributeService;
use App\Repositories\Attribute\AttributeRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\Attribute\StoreAttributeRequest;
use App\Http\Requests\Attribute\UpdateAttributeRequest;
use App\Enums\Status;

    
class AttributeController extends Controller
{

    protected $attributeService;
    protected $attributeRepository;

    public function __construct(
        AttributeService $attributeService,
        AttributeRepository $attributeRepository,
    ){
        $this->attributeService = $attributeService;
        $this->attributeRepository = $attributeRepository;
    }

    
    public function index(Request $request){

        $attributes = $this->attributeService->paginate($request);
        return response()->json([
            'attributes' => method_exists($attributes, 'items') ? AttributeResource::collection($attributes->items()) : $attributes,
            'links' => method_exists($attributes, 'items') ? $attributes->linkCollection() : null,
            'current_page' => method_exists($attributes, 'items') ? $attributes->currentPage() : null,
            'last_page' => method_exists($attributes, 'items') ? $attributes->lastPage() : null
        ], Response::HTTP_OK);
    }

    public function create(StoreAttributeRequest $request){

        $auth = auth()->user();

        $data = $this->attributeService->create($request, $auth);
        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'attribute' => new AttributeResource($data['attribute'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(UpdateAttributeRequest $request, $id){
        $auth = auth()->user();

        $data = $this->attributeService->update($request, $id, $auth);
 
        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'attribute' => new AttributeResource($data['attribute']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }


    public function show(Request $request, $id){

        if(empty($id) || $id < 0 ){
            return  $this->returnIfIdValidataFail();
        }

        $attribute = $this->attributeRepository->findById($id);

        if(!$attribute){
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Không có dữ liệu phù hợp'
            ], Response::HTTP_NOT_FOUND);
        }else{
            return response()->json(
                new AttributeResource($attribute)
            );
        }
    }


    public function destroy($id, Request $request){

        if(empty($id) || $id < 0 ){
            return $this->returnIfIdValidataFail();
        }

        $attribute = $this->attributeRepository->findById($id);

        if(!$attribute){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->attributeService->delete($id)){
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
        $respository = 'App\Repositories\Attribute\AttributeRepository';

        if($this->attributeService->updateByField($request, $id, $respository)){
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
