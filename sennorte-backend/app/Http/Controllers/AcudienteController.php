<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AcudienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('acudiente')
            ->join('estado_civil', 'estado_civil.id_estado_civil', '=', 'acudiente.id_estado_civil')
            ->select(
                'acudiente.id_acudiente',
                'acudiente.nombre_acudiente',
                'acudiente.direccion_acudiente',
                'acudiente.telefono_1',
                'acudiente.telefono_2',
                'acudiente.fecha_nacimiento_acudiente',
                'acudiente.id_estado_civil',
                'estado_civil.estado_civil',
                'acudiente.estado'
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
        $count = DB::table('acudiente')
            ->where('id_acudiente', $request->id_acudiente)
            ->select(
                DB::raw('count(id_acudiente) as acudiente_count')
            )
            ->get();

        if ($count[0]->acudiente_count === 0) {

            $message = DB::table('acudiente')->insert([
                'id_acudiente' => $request['id_acudiente'],
                'nombre_acudiente' => $request['nombre_acudiente'],
                'direccion_acudiente' => $request['direccion_acudiente'],
                'telefono_1' => $request['telefono_1'],
                'telefono_2' => $request['telefono_2'],
                'fecha_nacimiento_acudiente' => $request['fecha_nacimiento_acudiente'],
                'id_estado_civil' => $request['id_estado_civil']
            ]);
            return response()->json($message);
        }

        return response()->json([
            'error' => 'Ya existe un acudiente registrado con el documento '.$request->id_acudiente
        ]);




    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $message = DB::table('acudiente')->where('id_acudiente', $id)->update([
            "nombre_acudiente" => $request['nombre_acudiente'],
            "direccion_acudiente" => $request['direccion_acudiente'],
            "telefono_1" => $request['telefono_1'],
            "telefono_2" => $request['telefono_2'],
            "fecha_nacimiento_acudiente" => $request['fecha_nacimiento_acudiente'],
            "id_estado_civil" => $request['id_estado_civil']
        ]);
        return response()->json($message);
    }


    public function cambiar(Request $request)
    {
        $messageestado = DB::table('acudiente')->where('id_acudiente', $request->id_acudiente)
            ->update([
                "estado" => $request->estado
            ]);
        return response()->json($messageestado);
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
