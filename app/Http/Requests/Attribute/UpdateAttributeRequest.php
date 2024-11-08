<?php

namespace App\Http\Requests\Attribute;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttributeRequest extends FormRequest
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
            'canonical' => 'required|unique:attributes,canonical, '.$this->id.'',
            'attribute_catalogue_id' => 'gt:0'
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'Bạn chưa nhập vào Họ Tên.',
            'canonical.required' => 'Bạn chưa nhập vào canonical',
            'canonical.unique' => 'Canonical đã tồn tại. Hãy chọn giá trị khác',
            'attribute_catalogue_id.gt' => 'Bạn chưa chọn nhóm thuộc tính'
        ];
    }
}
