<?php   
namespace App\Services;
use Illuminate\Support\Facades\DB;
use App\Classes\FileUploader;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;


class BaseService{

    protected $payload = [];
    protected $model;

    public function __construct($model = null){
       $this->model = $model;
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


    protected function initializePayload($request, $except = []){
        $this->payload = $request->except(['_method', ...$except]);


        return $this;
    }

    protected function handleUserId($auth = null){
        if($auth){
            $this->payload['user_id'] = $auth->id;
        }
        return $this;
    }


    protected function getPayload(){
        return $this->payload;
    }

    protected function processFiles(
        $request, 
        $auth, 
        $files = ['images'], 
        $customFolder = ['avatar'], 
        $imageType = 'image')
    {
        if($auth && count($files) && is_array($files)){
            $this->fileUploader = new FileUploader($auth->email);
            foreach($files as $keyFile => $file){
                if($request->file($file)){
                    $this->payload[$file] = $this->fileUploader->uploadFile($request->file($file), $imageType, $customFolder);
                }else{
                    if($request->input($file)){
                        $this->payload[$file] = str_replace(config('app.url').'storage', 'public', $this->payload[$file]);
                    }
                }
            }
        }
        return $this;
    }

    protected function processCanonical(){
        $this->payload['canonical'] = Str::slug($this->payload['canonical']);
        return $this;
    }

    protected function processAlbum($request, $auth, $customFolder){
        if($request->input('album') && !empty($request->input('album'))){
            $album =  explode(',', $request->input('album'));
            $temp = []; 
            if(isset($album) && count($album)){
                foreach($album as $key => $val){
                    $imageName = basename($val);
                    $emailPrefix = Str::before($auth->email, '@');
                    $sourcePath = public_path('tempotary/'. $emailPrefix .'/'. $imageName );
                    $destinationPath = storage_path('app/public');
                    if(isset($customFolder) && count($customFolder)){
                        $destinationPath .=  '/'. $emailPrefix. '/' . 'image' .'/'. implode('/', $customFolder);
                    }
                    if(!File::exists($destinationPath)){
                        File::makeDirectory($destinationPath, 0755, true);
                    }
                    $destinationFile = $destinationPath. '/' .$imageName;
                    if(File::exists($sourcePath)){
                        File::move($sourcePath, $destinationFile);
                    }
                    $temp[] = 'storage/' . $emailPrefix . '/' . 'image' . '/' . implode('/', $customFolder) . '/' . $imageName ;
                }
            }
            $this->payload['album'] = $temp;
        }
        return $this;
    }
 
    protected function nestedset($auth){
        $this->nested->Get();
        $this->nested->Recursive(0, $this->nested->Set());
        $this->nested->Action($auth);
    }

    protected function catRelationArray($request, $instance, $model){
        $catalogues = explode(',',  $request->input('catalogues', ''));

        $catalogues = array_filter($catalogues, function($item){
            return !empty(trim($item));
        });
        $foreignKey = $model.'_catalogue_id'; 
        $catalogues = ($catalogues && $catalogues[0]  !== 'null') ? $catalogues : [];

        $newCatArray = array_unique([...$catalogues, ...[$instance->{$foreignKey}]]);
        return $newCatArray;
    }
   
    protected function createCatRelation($request, $instance, $model){
        $relation = $model.'_catalogues';
        $catDataArray = $this->catRelationArray($request, $instance, $model);
        $instance->{$relation}()->attach($catDataArray);
    }

    protected function whereHasCatalogue($request){
        $catId = $request->integer($this->model.'_catalogue_id');
        $table = $this->model . '_catalogues';
        $callback = null;
        if($catId > 0){
            $callback = function($query) use ($catId, $table){
                if($catId > 0) {
                    $query->whereIn($this->model . '_catalogue_id', function($subQuery) use ($catId, $table){
                        $subQuery ->select('id')
                                ->from($table)
                                ->where('lft', '>=', function($innerQuery) use ($catId, $table){
                                    $innerQuery ->select('lft')
                                                ->from($table)
                                                ->where('id', $catId);
                                })
                                ->where('rgt', '<=', function($innerQuery) use($catId, $table){
                                    $innerQuery ->select('rgt')
                                                ->from($table)
                                                ->where('id', $catId);
                                });
                    });

                }
            };
        }
        return $callback;
    }

    protected function createTagRelation($request, $instance){
        if($request->input('tags') && $request->input('tags') !== 'null'){
            $tagId = explode(',', $request->input('tags'));
            $instance->tags()->attach($tagId);
        }
    }
    
    

    public function detachRelation($instance, $relation = []){
        if(isset($relation) && count($relation)){
            foreach($relation as $key => $val){
                $instance->{$val}()->detach();
            }
        }
    }
}