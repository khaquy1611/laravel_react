<?php

namespace App\Http\Controllers\Api\V1;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __construct() {
       
    }

    public function deleteBatch(Request $request) {
        DB::beginTransaction();
        try {
            $ids = $request->input('ids');
            $model = $request->input('model');
            if (!is_array($ids) || count($ids) === 0) {
                return response()->json([
                    'error' => 'Danh sách id không hợp lệ'
                ], Response::HTTP_BAD_REQUEST);  
            }
            
            $repository = app($this->callRepository($model));
            $deletedCount = $repository->deleteBatch($ids);
            DB::commit();
            return response()->json([
                'message' => "Đã xóa thành công {$deletedCount} bản ghi",
            ],Response::HTTP_OK);
        }catch (\Exeption $e) {
            DB::rollBack();
            return response()->json(['error' => 'Có vấn đề xảy ra'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateBatch(Request $request) {
        DB::beginTransaction();
        try {
            $ids = $request->input('ids');
            $model = $request->input('model');
            $field = $request->input('field');
            $selectedValue = $request->input('selectedValue');
            if (!isset($ids) || !is_array($ids) || count($ids) === 0) {
                return response()->json([
                    'error' => 'Danh sách id không hợp lệ'
                ], Response::HTTP_BAD_REQUEST);  
            }
            $repository = app($this->callRepository($model));
            $whereIn = [
                'whereInField' => 'id',
                'whereInValue' => $ids
            ];
            $payload[$field] = $selectedValue;
            $updateCount = $repository->updateBatch($payload, $whereIn);
            DB::commit();
            return response()->json([
                'message' => "Đã cập nhập thành công {$updateCount} bản ghi",
            ],Response::HTTP_OK);
        }catch (\Exeption $e) {
            DB::rollBack();
            return response()->json(['error' => 'Có vấn đề xảy ra'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function callRepository($model) {
        $singularModel = Str::singular($model);
        $modelClass = Str::studly($singularModel);
        $folder = Str::studly(current(explode('_', $singularModel)));
        $repository = "App\\Repositories\\{$folder}\\{$modelClass}Repository";
        return $repository;
    }
}
