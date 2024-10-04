<?php  
use Illuminate\Support\Str;

if(! function_exists('getImage')){

    function getImages($image, ?string $thumb = null){
        $newImage = str_replace('public', 'storage', $image);
        if($thumb){
            $newImage = str_replace('image', 'thumb', $newImage);
        }
        $basename = basename($newImage);
        $thumbName = (($thumb) ? '_' : '').$basename;

        $newImage = str_replace($basename, $thumbName, $newImage);

        return (!empty($newImage)) ? asset($newImage) : null;
    }

}


if(! function_exists('loadClass')){

    function loadClass($model, $classType, $isSubFolder = true){

        $folder = [
            'Repository' => 'Repositories',
            'Service' => 'Services',
        ];


        $name = Str::studly(Str::singular($model));

        $subFolderParts = explode('_', $model);
        $subFolderCount = count($subFolderParts);

        if($subFolderCount > 2){
            $subFolder = implode('', array_map('ucfirst', array_slice($subFolderParts, 0, -1)));
        }else{
            $subFolder = ucfirst($subFolderParts[0]);
        }

        if(substr($subFolder, -1) === 's'){
            $subFolder = substr($subFolder, 0, -1);
        }


        $className = $isSubFolder ? "App\\{$folder[$classType]}\\{$subFolder}\\{$name}{$classType}" 
        : "App\{$folder[$classType]}\\{$modelClass}{$classType}";

        return $className;

    }

}