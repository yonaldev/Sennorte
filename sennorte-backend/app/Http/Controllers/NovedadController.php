<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class NovedadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $novedades = DB::table('novedad')->orderByRaw('fecha DESC')->get();
        return response()->json($novedades);
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
        $message = DB::table('novedad')->insert([
            "tipo_novedad"  => $request['tipoNovedad'],
            "title"         => $request['title'],   
            "descripcion"   => $request['descripcion'],
            "detalles"      => $request['detalles'],
            "importancia"   => $request['importancia'],
            "color"         => $request['color'],
            "imagen"        => $request['urlImagen'],
            "url"           => $request['url']    
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
        $message = DB::table('novedad')->where('id_novedad', $id)->delete();
        return response()->json($message);
    }
}
