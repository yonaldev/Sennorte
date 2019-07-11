<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class MedicamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('medicamento')
                    ->join('tipo_aplicacion', 'medicamento.tipo_aplicacion_id_tipo_aplicacion', '=', 'tipo_aplicacion.id_tipo_aplicacion')
                    ->join('unidad_medida', 'medicamento.id_unidad_medida','=','unidad_medida.id_unidad_medida')
                    ->select('medicamento.id_medicamento',
                            'medicamento.nombre_medicamento',
                            'medicamento.dosis',
                            'unidad_medida.unidad_medida',
                            'tipo_aplicacion.nombre_aplicacion',
                            'tipo_aplicacion.id_tipo_aplicacion',
                            'medicamento.estado_medicamento',
                            'unidad_medida.id_unidad_medida')
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
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $message = DB::table('medicamento')->insert([
            "nombre_medicamento" => $request["nombre_medicamento"],
            "dosis" => $request["dosis"],
            "tipo_aplicacion_id_tipo_aplicacion" => $request["tipo_aplicacion_id_tipo_aplicacion"],
            "id_unidad_medida" => $request["id_unidad_medida"]
        ]);
        return response()->json($message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($value)
    {
        $data = DB::table('medicamento')->where('medicamento.nombre_medicamento','like',$value.'%')
                                        ->join('tipo_aplicacion','medicamento.tipo_aplicacion_id_tipo_aplicacion','=','tipo_aplicacion.id_tipo_aplicacion')
                                        ->join('unidad_medida','medicamento.id_unidad_medida','=','unidad_medida.id_unidad_medida')
                                        ->select(
                                            'medicamento.id_medicamento',
                                            'medicamento.nombre_medicamento',
                                            'medicamento.dosis',
                                            'tipo_aplicacion.nombre_aplicacion',
                                            'unidad_medida.unidad_medida'
                                        )->orderBy('medicamento.nombre_medicamento','desc')
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
        $message = DB::table('medicamento')->where('id_medicamento',$id)->update([
            'nombre_medicamento'                => $request['nombre_medicamento'],
            'dosis'                             => $request['dosis'],
            'tipo_aplicacion_id_tipo_aplicacion'=> $request['id_tipo_aplicacion'],
            'id_unidad_medida'                  => $request['id_unidad_medida']
        ]);

        return response()->json($message);
    }

    public function changeStatus(Request $request)
    {
        $message = DB::table('medicamento')->where('id_medicamento',$request['id'])->update([
            'estado_medicamento'    => $request['status']
        ]);

        return response()->json($message);
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
