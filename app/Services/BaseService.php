<?php 
namespace App\Services;
use Illuminate\Support\Facades\DB;

class BaseService {
    public function __construct() {
        
    }
    
    public function updateByField($request, $id, $repository) {
        DB::beginTransaction();
        try {
            $column = $request->input('column');
            $value = $request->input('value');
            $payload[$column] = $value === true ? 2 : 1;
            $repository = app($repository);
            $modelCollection = $repository->update($id, $payload);
            DB::commit();
            return true;
        } catch(\Exeption $e) {
            DB::rollBack();
            return false;
        }
    }
}