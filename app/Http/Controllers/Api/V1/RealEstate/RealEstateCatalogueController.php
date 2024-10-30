<?php   
namespace App\Http\Controllers\Api\V1\RealEstate;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\RealEstateCatalogueResource;
use App\Services\RealEstate\RealEstateCatalogueService;
use App\Repositories\RealEstate\RealEstateCatalogueRepository;
use App\Http\Requests\UpdateByFieldRequest;
use App\Http\Requests\RealEstate\StoreRealEstateCatalogueRequest;
use App\Http\Requests\RealEstate\UpdateRealEstateCatalogueRequest;
use App\Http\Requests\RealEstate\DeleteRealEstateCatalogueRequest;
use App\Enums\Status;

    
class RealEstateCatalogueController extends Controller
{

    protected $realEstateCatalogueService;
    protected $realEstateCatalogueRepository;
    protected $auth;

    public function __construct(
        RealEstateCatalogueService $realEstateCatalogueService,
        RealEstateCatalogueRepository $realEstateRepository,
    ){
        $this->realEstateCatalogueService = $realEstateCatalogueService;
        $this->realEstateCatalogueRepository = $realEstateRepository;
        $this->auth = auth()->user();
    }


    
    public function index(Request $request){
        $realEstateCatalogues = $this->realEstateCatalogueService->paginate($request);

        return response()->json([
            'real_estate_catalogues' => method_exists($realEstateCatalogues, 'items') ? RealEstateCatalogueResource::collection($realEstateCatalogues->items()) : $realEstateCatalogues,
            'links' => method_exists($realEstateCatalogues, 'items') ? $realEstateCatalogues->linkCollection() : null,
            'current_page' => method_exists($realEstateCatalogues, 'items') ? $realEstateCatalogues->currentPage() : null,
            'last_page' => method_exists($realEstateCatalogues, 'items') ? $realEstateCatalogues->lastPage() : null
        ], Response::HTTP_OK);
    }

    public function create(StoreRealEstateCatalogueRequest $request){

        $auth = auth()->user();
        $data = $this->realEstateCatalogueService->create($request, $auth);

        if($data['code'] == Status::SUCCESS){
            return response()->json([
               'message' => 'Thêm mới bản ghi thành công',
               'real_estate_catalogue' => new RealEstateCatalogueResource($data['realEstateCatalogue'])
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => $data['message']
         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(UpdateRealEstateCatalogueRequest $request, $id){


        $auth = auth()->user();
        $data = $this->realEstateCatalogueService->update($request, $id, $auth);


        if($data['code'] == Status::SUCCESS){
         return response()->json([
             'message' => 'Cập nhật bản ghi thành công',
             'real_estate_catalogue' => new RealEstateCatalogueResource($data['realEstateCatalogue']),
             'code' => Response::HTTP_OK
             ], Response::HTTP_OK);
         }
    }


    public function show(Request $request, $id){
        try {
           
            if(!$id){
                return response()->json([
                    'code' => Status::ERROR,
                    'message' => 'Không tìm thấy dữ liệu phù hợp'
                ], Response::HTTP_NOT_FOUND);
            }


            $realEstateCatalogue = $this->realEstateCatalogueRepository->findById($id);

            return response()->json(
                new RealEstateCatalogueResource($realEstateCatalogue)
            );


        } catch (\Exception $th) {
            return response()->json([
                'code' => Status::ERROR,
                'message' => 'Network Error'
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function destroy($id, DeleterealEstateCatalogueRequest $request){
        $realEstateCatalogue = $this->realEstateCatalogueRepository->findById($id);

        if(!$realEstateCatalogue){
            return response()->json([
                'message' => 'Không tìm thấy bản ghi cần xóa',
                'code' => Status::ERROR
             ], Response::HTTP_NOT_FOUND); 
        }

        if($this->realEstateCatalogueService->delete($id, $this->auth)){
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
        $respository = 'App\Repositories\RealEstate\realEstateCatalogueRepository';
        if($this->realEstateCatalogueService->updateByField($request, $id, $respository)){
            return response()->json([
                'message' => 'Cập nhật dữ liệu thành công',
            ], Response::HTTP_OK); 
        }

        return response()->json([
            'message' => 'Cập nhật dữ liệu không thành công',
        ], Response::HTTP_INTERNAL_SERVER_ERROR); 
    }

    // private function returnIfIdValidataFail(){
    //     return response()->json([
    //         'message' => 'Xóa bản ghi thành công',
    //         'code' => Status::SUCCESS
    //      ], Response::HTTP_OK); 
    // }

}