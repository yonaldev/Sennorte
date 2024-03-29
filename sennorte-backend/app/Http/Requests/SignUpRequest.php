<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'document' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'name' => 'required',
            'lastname' => 'required',
            'rol' => 'required'
        ];
    }
}
