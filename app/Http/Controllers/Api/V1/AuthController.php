<?php

namespace App\Http\Controllers\Api\V1;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\AuthRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    public function __construct() {
        // $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(AuthRequest $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Tài khoản hoặc mật khẩu không chính xác'], Response::HTTP_UNAUTHORIZED);
        }
        $user = auth()->user();
        $refreshTokenData = $this->refreshTokenData($user);
        $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);

        $user->refresh_token = $refresh_token;
        $user->refresh_token_expiry = $refreshTokenData['expires_in'];
        $user->save();

        $cookie = $this->setTokenAndRefreshTokenCookie($token, $refresh_token);
        $tokenCookie = $cookie['tokenCookie'];
        $refreshTokenCookie = $cookie['refreshTokenCookie'];
        return $this->respondWithToken(trim($token), $refresh_token , $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);
    }

    protected function respondWithToken($token, $refresh_token, $user)
    {
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'refresh_token' =>  $refresh_token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 10
        ]);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
         try {
            if ($request->hasCookie('access_token')) {
             
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . trim($token));
            }
            
            // kiểm tra token và xác thực người dùng
            $user = JWTAuth::parseToken()->authenticate();
            $token = auth()->refresh();
            auth()->invalidate(true);
            $refreshTokenData = $this->refreshTokenData($user);
            $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
            $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
            $tokenCookie = $cookie['tokenCookie'];
            $refreshTokenCookie = $cookie['refreshTokenCookie'];
            return $this->respondWithToken($token, $refreshToken , $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);
           }catch(TokenExpiredException $e) {

            if ($request->hasCookie('refresh_token')) {

               
                if (!$request->cookie('refresh_token')) {
                    return response()->json(['message' => 'Token đã hết hạn'], Response::HTTP_UNAUTHORIZED);
                }

                $refreshTokenCookie = $request->cookie('refresh_token');
                $refreshTokenDecode = JWTAuth::getJWTProvider()->decode($refreshTokenCookie);
                $user = User::find($refreshTokenDecode['user_id']);
                $token = auth()->login($user);
                $refreshTokenData = $this->refreshTokenData($user);
                $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
                $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
                $tokenCookie = $cookie['tokenCookie'];
                $refreshTokenCookie = $cookie['refreshTokenCookie'];
                return $this->respondWithToken($token, $refreshToken , $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);
            }
               
            // Token hết hạn
            return response()->json(['message' => 'Token đã hết hạn'], Response::HTTP_UNAUTHORIZED);
           }catch(JWTException $e) {
             // Token không hợp lệ
             return response()->json(['message' => 'Token không hợp lệ'], Response::HTTP_UNAUTHORIZED);
           }catch(\Exception $e) {
            // Token không hợp lệ
            return response()->json(['message' => 'Không có Token'], Response::HTTP_UNAUTHORIZED);
          }
    }

    public function me() {
        return response()->json([
         'user' => new UserResource(auth()->user())
        ]);
    }

    private function setTokenAndRefreshTokenCookie($token, $refreshToken) {
        $cookie = Cookie::make(
            'access_token', 
            $token, 
            auth()->factory()->getTTL() * 60 * 24, // 1 ngày
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        $refreshTokenCookie = Cookie::make(
            'refresh_token', 
            $refreshToken, 
            config('jwt.refresh_ttl'), // 1 ngày
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        return [
            'tokenCookie' => $cookie,
            'refreshTokenCookie' => $refreshTokenCookie 
        ];
    }

    private function refreshTokenData($user) {
        return [
            'user_id' => $user->id,
            // 'expires_in' => time() + config('jwt.refresh_ttl'),
            'expires_in' => time() + 1,
            'random' => time().md5((rand()))
        ];
    }

    private function refreshToken($token, $refreshToken) {

    }
}