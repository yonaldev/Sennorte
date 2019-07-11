<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $pago = DB::table('pago')->get();

        return response()->json($pago);
    }

    public function getInfoPago()
    {
        $pago = DB::table('residente')
            ->join('acudiente', 'acudiente.id_acudiente', '=', 'residente.id_acudiente')
            ->select(
                'residente.nombre1_residente',
                'residente.apellido_residente',
                'residente.id_residente',
                'acudiente.nombre_acudiente',
                'acudiente.id_acudiente'
                )
                ->where('residente.estado', '=', 1)
                ->get();

        return response()->json($pago);
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
        //
        $data = DB::table('pago')
            ->insert([
                'fecha_pago' => Carbon::now('America/Bogota'),
                'valor_pago' => $request['valor_pago'],
                'observacion' => $request['observacion'],
                'residente_id_residente' => $request['id_residente']
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
        //
        $data = DB::table('pago')
            ->where('residente_id_residente', $id)
            ->orderBy('id_pago', 'desc')
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
        $data = DB::table('pago')->where()->update();
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
