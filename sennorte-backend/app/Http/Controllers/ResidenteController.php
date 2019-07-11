<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use DB;

class ResidenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        // VALIDACION DE CUANTOS ACUDIENTES
        $count = DB::table('residente')->select(
            DB::raw('count(id_residente) as numero_residente')
                )->where('id_acudiente',$request->id_acudiente)
                ->get();

        // VALIDACION DE CAMA Y DE REGISTRO EFECTIVO CON MENOS DE DOS RESIDENTES A CARGO
        if ($count[0]->numero_residente < 2) {
        //     $countCama = DB::table('residente')
        //                     ->where('id_cama',$request->id_cama)
        //                     ->select(
        //                         DB::raw('count(id_cama) as cama'))
        //                     ->get();

            // VALIDACION PARA REGISTRO DE RESIDENTE SI LA CAMA NO EST OCUPADA 
            // if ($countCama[0]->cama < 1) {
                $message = DB::table('residente')->insert([
                    'id_residente'=>$request['id_residente'],
                    'nombre1_residente'=>$request['nombre1_residente'],
                    'nombre2_residente'=>$request['nombre2_residente'],
                    'apellido_residente'=>$request['apellido_residente'],
                    'fecha_nacimiento_residente'=>$request['fecha_nacimiento_residente'],
                    'sexo'=>$request['sexo'],
                    'peso'=>$request['peso'],
                    'parentesco'=>$request['parentesco'],
                    'id_acudiente'=>$request['id_acudiente'],
                    'eps_id_eps'=>$request['eps_id_eps'],
                    'id_estado_civil'=>$request['id_estado_civil'],
                    // 'id_cama'=>$request['id_cama']
                ]);

                return response()->json($message);
            }

            // return response()->json([
            //     'error' => 'La cama seleccionada esta en uso por otro residente'
            // ], Response::HTTP_UNPROCESSABLE_ENTITY);

        // }

        return response()->json([
            'error' => 'El acudiente seleccionado supera el número limite de residentes asociados. 
            Registre un nuevo acudiente o seleccione uno diferente'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = DB::table('residente')
                    ->where('id_residente',$id)
                    ->select(
                        'id_residente',
                        'nombre1_residente',
                        'nombre2_residente',
                        'apellido_residente'
                    )
                    ->get();

        return response()->json($data);
    }

    public function informacionResidente($id)
    {
        
        $data = DB::table('residente')
                ->join('acudiente','residente.id_acudiente','=','acudiente.id_acudiente')
                ->join('estado_civil','residente.id_estado_civil','=','estado_civil.id_estado_civil')
                ->join('eps','residente.eps_id_eps','=','eps.eps_id_eps')
                ->where('id_residente',$id)
                ->select(
                    'residente.*',
                    'acudiente.*',
                    'estado_civil.estado_civil',
                    'eps.*'
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
        $count = DB::table('residente')->select(
            DB::raw('count(id_residente) as numero_residente')

        )->where('id_acudiente',$request->id_acudiente)
        ->get();

        if ($count[0]->numero_residente < 2) {
            // $countCama = DB::table('residente')
            //                 ->where('id_cama',$request->id_cama)
            //                 ->select(
            //                     DB::raw('count(id_cama) as cama')
            //                 )
            //                 ->get();
            // if ($countCama[0]->cama < 1) {
                $message = DB::table('residente')->where('id_residente',$id)
                        ->update([
                            'nombre1_residente'=>$request['nombre1_residente'],
                            'nombre2_residente'=>$request['nombre2_residente'],
                            'apellido_residente'=>$request['apellido_residente'],
                            'fecha_nacimiento_residente'=>$request['fecha_nacimiento_residente'],
                            'sexo'=>$request['sexo'],
                            'peso'=>$request['peso'],
                            'parentesco'=>$request['parentesco'],
                            'id_acudiente'=>$request['id_acudiente'],
                            'eps_id_eps'=>$request['eps_id_eps'],
                            'id_estado_civil'=>$request['id_estado_civil'],
                            // 'id_cama'=>$request['id_cama']
                        ]);

                return response()->json($message);
            // }

            // return response()->json([
            //     'error' => 'La cama seleccionada esta en uso por otro residente'
            // ], Response::HTTP_UNPROCESSABLE_ENTITY);

        }

        return response()->json([
            'error' => 'El acudiente seleccionado supera el número limite de residentes asociados. 
            Registre un nuevo acudiente o seleccione uno diferente'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        
    }

    public function changeStatus(Request $request, $id) 
    {
        $message = DB::table('residente')->where('id_residente',$id)
                        ->update([
                            'estado' => $request->status
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
