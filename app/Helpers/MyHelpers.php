<?php  

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