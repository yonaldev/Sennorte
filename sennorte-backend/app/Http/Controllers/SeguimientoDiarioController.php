<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;
use App\Http\Requests\CrearSeguimiento;

class SeguimientoDiarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     //************GET
    public function index()
    {
        $residente = DB::table('seguimiento_diario')->get();
            return response()->json($residente);
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

     //************GET
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

     //************POST
    public function store(Request $request)
    {
        $data = DB::table('seguimiento_diario')
            ->insert([
            'id_residente'=> $request['id_residente'],
            'fecha_creacion_informe'=> Carbon::now('America/Bogota'),
            'fecha_update_informe'=> Carbon::now('America/Bogota'),
            'informe' =>  $request['informe']
            ]);

            // dd($data->all());
        return response()->json($data);
    }
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


     //************GET
    public function show($id)
    {
        $data = DB::table('seguimiento_diario')
                ->where('id_residente', $id)
                ->orderBy('id_seguimiento_diario', 'desc')
                ->get();
                
        return response()->json($data);
    }

    // VER INFORME
    public function informe($id)
    {
        $data = DB::table('seguimiento_diario')
                ->where('id_seguimiento_diario', $id)
                ->get();
                
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     //************GET
    public function edit()
    {
        // $data = DB::table('seguimiento_diario')
        //         ->select(['id_seguimiento_diario',
        //                 'fecha_creacion_informe', 
        //                 'fecha_update_informe',
        //                 'id_residente',
        //                 'informe'])
        //         ->where('id_residente', $id);

        // return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     //************PUT
    public function update(Request $request, $id)
    {
        $data = DB::table('seguimiento_diario')->where('id_seguimiento', $id)
                ->update([
                    'informe' =>  $request['informe'],
                    'fecha_update_informe'=> Carbon::now('America/Bogota'),
        ]);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     //************DELETE
    public function destroy($id)
    {
        $data = DB::table('seguimiento_diario')->where('id_seguimiento_diario', $id)->delete();

        return response()->json($data);
    }
}
