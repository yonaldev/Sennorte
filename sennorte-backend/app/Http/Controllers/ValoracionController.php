<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class valoracionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('valoracion_ingreso')->get();

        return response()->json($data);
    }

    public function getResidente()
    {
        
        $data = DB::table('residente')
                    ->join('acudiente','acudiente.id_acudiente','=','residente.id_acudiente')
                    ->select(
                        'residente.id_residente',
                        'residente.nombre1_residente',
                        'residente.nombre2_residente',
                        'residente.apellido_residente',
                        'acudiente.nombre_acudiente',
                        'residente.estado'
                    )
                    ->where('residente.estado', '=', 1)
                    ->get();


        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = DB::table('valoracion_ingreso')
            ->insert([
            'id_valoracion' => $request['id_valoracion'],
            'antecedente_familiar' => $request['antecedente_familiar'],
            'antecedente_residente' => $request['antecedente_residente'],
            'valoracion_cefalocaudal' => $request['valoracion_cefalocaudal'],
            'informe_alergia' => $request['informe_alergia'],
            'antecedente_quirurgico' => $request['antecedente_quirurgico'],
            'fecha_creacion' => Carbon::now('America/Bogota'),
            'especialidades' => $request['especialidades'],
            'id_residente' => $request['id_residente'],
        ]);

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = DB::table('valoracion_ingreso')
        ->where('id_residente', $id)
        ->get();

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
