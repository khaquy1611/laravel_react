<?php   
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\Status;


class ConfigController extends Controller{

    public function __construct(){
        
    }

    public function __invoke(Request $request){
        try {
            $key = $request->input('key');
            $config = $this->data();

            if(!empty($key) && $key === 'all'){
                return response()->json([
                    'data' => $config,
                    'message' => 'Success',
                    'status' => Status::SUCCESS
                ], Response::HTTP_OK);
            }
            if(isset($config[$key]) && count($config[$key])){
                return response()->json([
                    'data' => $config[$key],
                    'message' => 'Success',
                    'status' => Status::SUCCESS
                ], Response::HTTP_OK);
            }
            return response()->json([
                'message' => 'Không tìm thấy Config',
                'status' =>  Status::ERROR
            ], Response::HTTP_NOT_FOUND);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có vấn đề xảy ra',
                'status' =>  Status::ERROR
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    private function data(){
        return [
            'direction' => [
                ['id' => 1, 'name' => 'Đông'],
                ['id' => 2, 'name' => 'Tây'],
                ['id' => 3, 'name' => 'Nam'],
                ['id' => 4, 'name' => 'Bắc'],
                ['id' => 5, 'name' => 'Tây Nam'],
                ['id' => 6, 'name' => 'Tây Bắc'],
                ['id' => 7, 'name' => 'Đông Nam'],
                ['id' => 8, 'name' => 'Đông Bắc'],
            ],
            'sell_foreign' => [
                ['id' => 1, 'name' => 'Không'],
                ['id' => 2, 'name' => 'Có']
            ],
            'legal' => [
                ['id' => 1, 'name' => 'Hợp đồng cọc'],
                ['id' => 2, 'name' => 'Hợp đồng mua bán'],
                ['id' => 3, 'name' => 'Hợp đồng thuê dài hạn'],
                ['id' => 4, 'name' => 'Sổ hồng'],
            ],
            'furniture' => [
                ['id' => 1, 'name' => 'Không nội thất'],
                ['id' => 2, 'name' => 'Nội thất một phần'],
                ['id' => 3, 'name' => 'Nhà thô'],
                ['id' => 4, 'name' => 'Đầy đủ nội thất'],
            ]
        ];
    }

}