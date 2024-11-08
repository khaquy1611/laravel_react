<?php   
namespace App\Services\Attribute;
use App\Services\BaseService;
use App\Repositories\Attribute\AttributeRepository;
use Illuminate\Support\Facades\DB;
use App\Enums\Status;


class AttributeService extends BaseService{

    protected $attributeRepository;
    protected $fileUploader;
    protected $files = ['image'];

    public function __construct(
        AttributeRepository $attributeRepository,
    ){
        $this->attributeRepository = $attributeRepository;
    }

    private function paginateAgrument($request){
        return [
            'perPage' => $request->input('perPage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'field' => ['name', 'canonical']
            ],
            'condition' => [
                'publish' => $request->integer('publish'),
                'attribute_catalogue_id' => $request->integer('attribute_catalogue_id'),
            ],
            'relation' => ['attribute_catalogues'],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',' ,$request->input('sort')) : ['id', 'desc'],
        ];
    }

    public function paginate($request){
        $agrument = $this->paginateAgrument($request);
        $attributes = $this->attributeRepository->pagination([...$agrument]);
        return $attributes;
    }

    private function imageAgrument(){
        return [
          'customFolder' =>   ['avatar'],
          'imageType' => 'image'
        ];
    }


    private function initilizeRequest($request, $auth, $except){
        return $this->initializePayload($request, $except)
        ->processFiles($request, $auth, $this->files, ...$this->imageAgrument())
        ->processCanonical($request)
        ->getPayload();
    }

    public function create($request, $auth){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initilizeRequest($request, $auth, $except);

            $attribute = $this->attributeRepository->create($payload);
            DB::commit();

            return [
                'attribute' => $attribute,
                'code' => Status::SUCCESS
            ];
        } catch (\Exception $e) {

            DB::rollback();
            return [
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ];
        }
    }

    public function update($request, $id, $auth){
        DB::beginTransaction();
        try {
            $except = [];
            $payload = $this->initilizeRequest($request, $auth, $except);

            $attribute = $this->attributeRepository->update($id, $payload);
            DB::commit();
            return [
                'attribute' => $attribute,
                'code' => Status::SUCCESS
            ];
        } catch (\Exception $e) {
            DB::rollback();
            return [
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ];
        }
    }

    public function delete($id){
        DB::beginTransaction();
        try {
            $this->attributeRepository->delete($id);
            DB::commit();
            return [
                'code' => Status::SUCCESS
            ];
        } catch (\Exception $e) {
            DB::rollback();
            return [
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ];
        }
    }
 

}