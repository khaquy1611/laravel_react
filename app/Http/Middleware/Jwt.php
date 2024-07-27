<?php

namespace App\Http\Middleware;
use Closure;
use DB;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        
       try {
        if ($request->hasCookie('access_token')) {
            $token = trim($request->cookie('access_token'));
            $request->headers->set('Authorization', 'Bearer ' . $token);

           
            // $userToken = DB::table('user_sessions')->where('user_id', $credentials ->id)->value('token');
         
            // if ($userToken !== $token) {
            //   return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            // }
            // $user = User::find($credentials ->id);
            // $request->auth = $user;
        }
        // kiểm tra token và xác thực người dùng
        $credentials  = JWTAuth::parseToken()->authenticate();
       
       }catch(TokenExpiredException $e) {
        // Token hết hạn
        return response()->json(['message' => 'Token đã hết hạn'], Response::HTTP_UNAUTHORIZED);
       }catch(JWTException $e) {
         // Token không hợp lệ
         return response()->json(['message' => 'Token không hợp lệ'], Response::HTTP_UNAUTHORIZED);
       }catch(\Exception $e) {
        // Token không hợp lệ
        return response()->json(['message' => 'Không có Token'], Response::HTTP_UNAUTHORIZED);
      }
     
      return $next($request);
    }
}