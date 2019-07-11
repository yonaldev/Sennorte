<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class RecetaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $message = DB::table('receta')->insert([
            'dosis_medicamento'          => $request['dosis'],
            'medicamento_id_medicamento' => $request['id_medicamento'],
            'dias'                       => $request['dias'],
            'lapso'                      => $request['lapso'],
            'formula_id_formula'         => $request['id_formula']                           
        ]);

        return response()->json($message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id_formula)
    {
        $data = DB::table('receta')
                    ->where('formula_id_formula',$id_formula)
                    ->join('medicamento','medicamento.id_medicamento','=','receta.medicamento_id_medicamento')
                    ->join('tipo_aplicacion','tipo_aplicacion.id_tipo_aplicacion','=','medicamento.tipo_aplicacion_id_tipo_aplicacion')
                    ->join('unidad_medida','unidad_medida.id_unidad_medida','=','medicamento.id_unidad_medida')
                    ->select(
                        'receta.id_receta',
                        'receta.medicamento_id_medicamento',
                        'receta.dosis_medicamento',
                        'receta.dias',
                        'receta.lapso',
                        'medicamento.nombre_medicamento',
                        'medicamento.dosis',
                        'tipo_aplicacion.nombre_aplicacion',
                        'unidad_medida.unidad_medida'
                    )
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
