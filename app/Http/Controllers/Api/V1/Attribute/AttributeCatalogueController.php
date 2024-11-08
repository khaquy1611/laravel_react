<?php   
namespace App\Http\Controllers\Api\V1\Attribute;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\AttributeCatalogueResource;
use App\Services\Attribute\AttributeCatalogueService;
use App\Repositories\Attribute\AttributeCatalogueRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\Attribute\StoreAttributeCatalogueRequest;
use App\Enums\Status;

    
class AttributeCatalogueController extends Controller
{

    protected $attributeCatalogueService;
    protected $attributeCatalogueRepository;

    public function __construct(
        AttributeCatalogueService $attributeCatalogueService,
        AttributeCatalogueRepository $attributeRepository,
    ){
        $this->attributeCatalogueService = $attributeCatalogueService;
        $this->attributeCatalogueRepository = $attributeRepository;
    }

    
    public function index(Request $request){

        $attributeCatalogues = $this->attributeCatalogueService->paginate($request);
        return response()->json([
            'attribute_catalogues' => method_exists($attributeCatalogues, 'items') ? AttributeCatalogueResource::collection($attributeCatalogues->items()) : $attributeCatalogues,
            'links' => method_exists($attributeCatalogues, 'items') ? $attributeCatalogues->linkCollection() : null,
            'current_page' => method_exists($attributeCatalogues, 'items') ? $attributeCatalogues->currentPage() : null,
            'last_page' => method_exists($attributeCatalogues, 'items') ? $attributeCatalogues->lastPage() : null
        ], Response::HTTP_OK);
    }

    public function create(StoreAttributeCatalogueRequest $request){

        $data = $this->attributeCatalogueService->create($request);
        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'attributeCatalogue' => new AttributeCatalogueResource($data['attributeCatalogue'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(StoreAttributeCatalogueRequest $request, $id){
        $data = $this->attributeCatalogueService->update($request, $id);
 
        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'attributeCatalogue' => new AttributeCatalogueResource($data['attributeCatalogue']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }


    public function show(Request $request, $id){

        if(empty($id) || $id < 0 ){
            return  $this->returnIfIdValidataFail();
        }

        $attribute = $this->attributeCatalogueRepository->findById($id);

        if(!$attribute){
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Không có dữ liệu phù hợp'
            ], Response::HTTP_NOT_FOUND);
        }else{
            return response()->json(
                new AttributeCatalogueResource($attribute)
            );
        }
    }


    public function destroy($id, Request $request){

        if(empty($id) || $id < 0 ){
            return $this->returnIfIdValidataFail();
        }

        $attributeCatalogue = $this->attributeCatalogueRepository->findById($id);

        if(!$attributeCatalogue){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->attributeCatalogueService->delete($id)){
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
        $respository = 'App\Repositories\attribute\attributeCatalogueRepository';

        if($this->attributeCatalogueService->updateByField($request, $id, $respository)){
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
