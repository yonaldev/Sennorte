<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $data = DB::table('evento')->get();

        // return response()->json($data, 200);
    }

    public function verUltimos()
    {
        // $data = DB::table('evento')->get()->take(5);

        // return response()->json($data, 200);
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
        $message = DB::table('evento')->insert([
            'titulo_evento' => $request->title,
            'descripcion_evento' => $request->descripcion,
            'imagen' => $request->imagen,
            'hora' => $request->hora,
            'minuto' => $request->minuto,
            'fecha' => $request->fecha,
            'horario' => $request->horario
        ]);

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
        $message = DB::table('evento')->where('id_evento',$id)->delete();

        return response()->json($message, 200);
    }
}
