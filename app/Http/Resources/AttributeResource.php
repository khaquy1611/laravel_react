<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use App\Http\Resources\AttributeCatalogueResource;

use App\Http\Resources\TagResource;

class AttributeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

   

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'canonical' => $this->canonical,
            'attribute_catalogue_id' => $this->attribute_catalogue_id,
            'image' => getImages($this->image),
            'publish' => $this->publish,
            'order' => $this->order,
            'attribute_catalogue' => new AttributeCatalogueResource($this->whenLoaded('attribute_catalogues')),
        ];
    }
}
