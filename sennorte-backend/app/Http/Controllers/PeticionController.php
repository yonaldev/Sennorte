<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class PeticionController extends Controller
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
        if ($request->tipoRegistro === 1) {
            $message = DB::table('habitacion')->insert([
                'habitacion' => $request->habitacion
            ]);
        } else if($request->tipoRegistro === 2) {
            $message = DB::table('cama')->insert([
                'cama' => $request->cama,
                'habitacion_id_habitacion' => $request->habitacion
            ]);
        }

        return response()->json($message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    public function showHabitacion()
    {
        $data = DB::table('habitacion')->get();
        return response()->json($data);
    }

    public function showEstadoCivil()
    {
        $data = DB::table('estado_civil')->get();
        return response()->json($data);
    }

    public function showTipoAplicacion()
    {
        $data = DB::table('tipo_aplicacion')->get();
        return response()->json($data);
    }

    public function showUnidadMedida()
    {
        $data = DB::table('unidad_medida')->get();
        return response()->json($data);
    }

    public function showMedicamentos()
    {
        $data = DB::table('medicamento')
                    ->join('tipo_aplicacion','medicamento.tipo_aplicacion_id_tipo_aplicacion','=','tipo_aplicacion.id_tipo_aplicacion')
                    ->join('unidad_medida','medicamento.id_unidad_medida','=','unidad_medida.id_unidad_medida')
                    ->select(
                        'medicamento.id_medicamento',
                        'medicamento.nombre_medicamento',
                        'tipo_aplicacion.nombre_aplicacion',
                        'unidad_medida.unidad_medida'
                    )
                    ->where('medicamento.estado_medicamento',1)
                    ->get();
        
        return response()->json($data);
    }

    public function showMedicamento($id)
    {
        $data = DB::table('medicamento')
                    ->where('id_medicamento', $id)
                    ->join('tipo_aplicacion','medicamento.tipo_aplicacion_id_tipo_aplicacion','=','tipo_aplicacion.id_tipo_aplicacion')
                    ->join('unidad_medida','medicamento.id_unidad_medida','=','unidad_medida.id_unidad_medida')
                    ->select(
                        'medicamento.id_medicamento',
                        'medicamento.nombre_medicamento',
                        'tipo_aplicacion.nombre_aplicacion',
                        'unidad_medida.unidad_medida'
                    )
                    ->where('medicamento.estado_medicamento',1)
                    ->get();
        
        return response()->json($data);
    }

    public function showRoles()
    {
        $data = DB::table('rol')->get();
        return response()->json($data);
    }

    public function showCama() 
    {
        $data = DB::table('cama')
                ->join('habitacion','habitacion.id_habitacion','=','cama.habitacion_id_habitacion')
                ->select(
                    'cama.cama',
                    'cama.id_cama',
                    'habitacion.habitacion'
                )
                ->where('cama.estado_cama',1)
                ->orderBy('habitacion.id_habitacion')
                ->get();
        return response()->json($data);
    }

    public function showEps() 
    {
        $data = DB::table('eps')
                    ->where('estado_eps',1)
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
