<?php   
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\LocationResource;

class DashboardController extends Controller
{


    
  
    public function __construct(
        
    ){
       
        

    }
   
    
    public function deleteBatch(Request $request){

        DB::beginTransaction();
        try {
            $ids = $request->input('ids');
            $model = $request->input('model');


            if(!is_array($ids) || count($ids) == 0 ){
                return response()->json([
                    'error' => 'Danh sách id không hợp lệ'
                ], Response::HTTP_BAD_REQUEST);
            }

            $repository = app($this->callRepository($model));

            $deletedCount = $repository->deleteBatch($ids);

            DB::commit();
            return response()->json([
                'message' => "Đã xóa thành công {$deletedCount} bản ghi",
            ], Response::HTTP_OK);
            

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Có vấn đề xảy ra'], Response::HTTP_INTERNAL_SERVER_ERROR );
        }
    }


    public function updateBatch(Request $request){
        DB::beginTransaction();
        try {
            $ids = $request->input('ids');
            $model = $request->input('model');
            $field = $request->input('field');
            $value = $request->input('value');

            if(!is_array($ids) || count($ids) == 0 ){
                return response()->json([
                    'error' => 'Danh sách id không hợp lệ'
                ], Response::HTTP_BAD_REQUEST);
            }

            $repository = app($this->callRepository($model));


            $whereIn = [
                'whereInField' => 'id',
                'whereInValue' => $ids
            ];

            $payload[$field] = $value;

            $updateCount = $repository->updateBatch($payload, $whereIn);
            DB::commit();
            return response()->json([
                'message' => "Đã cập nhật thành công {$updateCount} bản ghi",
            ], Response::HTTP_OK);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Có vấn đề xảy ra'], Response::HTTP_INTERNAL_SERVER_ERROR );
        }
    }

    private function callRepository($model, $isFolter = true){
        $singularModel = Str::singular($model); 
        $modelClass = Str::studly($singularModel);
        $folder = Str::studly(current(explode('_', $singularModel)));

        $repository = $isFolter ? "App\Repositories\\{$folder}\\{$modelClass}Repository" 
                               : "App\Repositories\\{$modelClass}Repository";
        return $repository;
    }

    public function location(Request $request){
        try {
            
            $type = $request->input('locationType');
            $parentId = $request->input('parent_id');

            if(empty($type)){
                return response()->json([
                    'message' => 'Không đủ thông tin của loại vị trí muốn lấy.'
                ], Response::HTTP_BAD_REQUEST);
            }

           
            $foreignColumn = ['provinces' => '','districts' => 'province','wards' => 'district'];
            $locationMapping = ['provinces' => 'provinces','districts' => 'districts','wards' => 'wards'];
            $isFolter = false;

            $repository = app($this->callRepository($type, $isFolter));
            $data = empty($parentId) ? $repository->all(['code', 'name']) 
                                     : $repository->findByParentId($parentId, (($foreignColumn[$type] !== '') ? $foreignColumn[$type].'_' : '').'code', ['code', 'name']);

            $locationName = $locationMapping[$type];
            
            return response()->json([
                'data' => LocationResource::collection($data),
                // 'parentId' => $parentId,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

}