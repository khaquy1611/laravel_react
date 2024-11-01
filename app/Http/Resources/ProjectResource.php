<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

use App\Http\Resources\TagResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

   

    public function toArray(Request $request): array
    {

        $projectCatalogueId = $this->project_catalogue_id;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'catalogues' => $this->project_catalogues->pluck('id')
                                                  ->reject(function($id) use ($projectCatalogueId){
                                                        return $id === $projectCatalogueId;
                                                  })->toArray(),
            'cats' => $this->project_catalogues->pluck('name')->toArray(),
            'description' => $this->description,
            'content' => $this->content,
            'album' => $this->album,
            'meta_title' => $this->meta_title ?? '', 
            'meta_keyword' => $this->meta_keyword ?? '',
            'meta_description'=> $this->meta_description ?? '',
            'canonical' => $this->canonical,
            'project_catalogue_id' => $this->project_catalogue_id,
            'image' => getImages($this->image),
            'icon'=> getImages($this->icon),
            'publish' => $this->publish,
            'follow' => $this->follow,
            'order' => $this->order,
            'tags' => $this->tags->map(function($tag){
                return [
                    'label' => $tag->name,
                    'value' => $tag->id,
                ];
            }),
            'province_id' => $this->province_id,
            'district_id' => $this->district_id,
            'ward_id' => $this->ward_id
        ];
    }
}
