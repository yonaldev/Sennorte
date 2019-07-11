<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormulaRequest extends FormRequest
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
        'id_formula'                => 'required|unique:formula',
        'fecha_formula'             => 'required',
        'ips'                       => 'required',
        'residente_id_residente'    => 'required' 
        ]; 
    }
}
