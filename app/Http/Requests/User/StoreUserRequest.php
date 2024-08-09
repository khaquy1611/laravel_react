<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|unique:users|email',
            'phone' => 'required',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
            'user_catalogue_id' => 'gt:0'
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'Bạn chưa nhập vào Họ Tên.',
            'email.required' => 'Bạn chưa nhập vào Email.',
            'email.unique' => 'Email đã tồn tại, hãy chọn email khác',
            'email.email' => 'Email chưa đúng định dạng ví dụ: abc@gmail.com',
            'password.required' => 'Bạn chưa nhập vào mật khẩu.',
            'confirmPassword.required' => 'Bạn chưa xác nhận mật khẩu.',
            'confirmPassword.same' => 'Mật khẩu không khớp.',
            'user_catalogue_id.gt' => 'Bạn chưa chọn nhóm thành viên'
        ];
    }
}
