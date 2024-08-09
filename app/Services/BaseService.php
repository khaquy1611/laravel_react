<?php   
namespace App\Services;
use Illuminate\Support\Facades\DB;
use App\Classes\FileUploader;
use Illuminate\Support\Facades\Hash;


class BaseService{

    public function __construct(){
        
    }

    public function updateByField($request, $id, $respository){
        DB::beginTransaction();
        try {
            $column = $request->input('column');
            $value = $request->input('value');
            $payload[$column] = $value === true ? 2 : 1;
            $respository = app($respository);
            $modelCollection = $respository->update($id, $payload);
            DB::commit();

            return true;

        } catch(\Exception $e ){
            DB::rollBack();
            return false;
        }
    }

    protected function request($request, $auth = null, $except = [], $customFolder = ['avatar'], $imageType = 'image'){

        $payload = $request->except(['_method', ...$except]);

        if($auth){
            if($request->file('image')){
                $this->fileUploader = new FileUploader($auth->email);
                $payload['image'] = $this->fileUploader->uploadFile($request->file('image'), $imageType, $customFolder);
            }else{
                if($request->input('image')){
                    $payload['image'] = str_replace(config('app.url').'storage', 'public', $payload['image']);
                }
            }
        }

        if($request->input('password') && !empty($request->input('password'))){
            $payload['password'] = Hash::make($payload['password']);
        }

        return $payload;
    }
    
}
