<?php   
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Enums\Status;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{

    public function __construct(
        
    ){
       
    }

    public function uploadToTempotary(Request $request){
        try {
            $auth = auth()->user();
            $emailPrefix = Str::before($auth->email, '@');


            $tempotaryPath = public_path('tempotary/' . strtolower($emailPrefix));

            if(!File::exists($tempotaryPath)){
                File::makeDirectory($tempotaryPath, 0755, true);
            }

            $image = $request->file('image');

            $filename = Str::uuid(). '.' .  $image->clientExtension();
            $image->move($tempotaryPath, $filename);
            
            return response()->json([
                'url' => asset('tempotary/'. strtolower($emailPrefix). '/'. $filename),
                'code' => Status::SUCCESS,
                'message' => 'Upload thành công'
            ]);


        } catch (\Exception $e) {
            return response()->json([
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }


    public function uploadCkeditor(Request $request){
        try {
            $auth = auth()->user();
            $emailPrefix = Str::before($auth->email, '@');

            $contentFolderPath = storage_path('app/public/'. $emailPrefix. '/image/content');

            if(!File::exists($contentFolderPath)){
                File::makeDirectory($contentFolderPath, 0755, true);
            }

            if($request->hasFile('image')){
                $file = $request->file('image');
                $filename = Str::uuid(). '.' .  $file->clientExtension();
                $filePath = $contentFolderPath;
                $file->move($filePath, $filename);

                // $url = Storage::url($emailPrefix . '/image/content/' . $filename);
                $url = asset('storage' . '/'. $emailPrefix. '/image/content/' . $filename);

                return response()->json([
                    'url' => $url,
                    'code' => Status::SUCCESS,
                    'message' => 'Upload hình ảnh thành công vào CKEDITOR'
                ]);


            }



        } catch (\Exception $e) {
            return response()->json([
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteCkeditor(Request $request){
        try {

            $url = $request->input('url');
            $relativePath = str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
            if(Storage::disk('public')->exists($relativePath)){

                Storage::disk('public')->delete($relativePath);

                return response()->json([
                    'code' => Status::SUCCESS,
                    'message' => 'Xóa Ảnh khỏi Ckeditor thành công'
                ]);
            }

            return 1;
        } catch (\Exception $e) {
            return response()->json([
                'code' => Status::ERROR,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        // return $data;
    }
   
   
}