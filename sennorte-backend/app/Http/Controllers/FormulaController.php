<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FormulaRequest;
use Symfony\Component\HttpFoundation\Response;
use DB;

class FormulaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data = DB::table('formula')
                    
                    ->join('receta','receta.formula_id_formula','=','formula.id_formula')
                    ->join('residente','residente.id_residente','=','formula.residente_id_residente')
                    ->select(
                        'formula.id_formula',
                        'formula.fecha_formula',
                        'formula.ips',
                        'residente.id_residente',
                        'residente.nombre1_residente',
                        'residente.nombre2_residente',
                        'residente.apellido_residente',
                        DB::raw('count(receta.id_receta) as medicamentos_asociados'),
                        'formula.medico_remitente',
                        'formula.encargado_formula'
                    )
                    ->groupBy('formula.id_formula')
                    ->orderBy('formula.fecha_formula','desc')
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
        $message = DB::table('formula')->insert([
            'id_formula'             => $request['ref_formula'],
            'fecha_formula'          => $request['fecha'],
            'residente_id_residente' => $request['documento'],
            'ips'                    => $request['ips'],
            'medico_remitente'       => $request['medicoRemitente'],
            'encargado_formula'      => $request['encargadoFormula']             
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
        $residente = DB::table('residente')
                        ->select(
                            DB::raw('count(id_residente) as residente')
                        )
                        ->where('id_residente',$id)
                        ->get();

        if ($residente[0]->residente == 1) {
            $data = DB::table('formula')
                        ->join('receta','receta.formula_id_formula','=','formula.id_formula')
                        ->join('residente','residente.id_residente','=','formula.residente_id_residente')
                        ->select(
                            'formula.*',
                            'residente.id_residente',
                            'residente.nombre1_residente',
                            'residente.nombre2_residente',
                            'residente.apellido_residente',
                            DB::raw('count(receta.id_receta) as medicamentos_asociados')
                        )
                        ->where('residente_id_residente',$id)
                        ->groupBy('formula.id_formula')
                        ->orderBy('formula.fecha_formula','desc')
                        ->get();
            return response()->json($data, 200);
        } else {
            $data = DB::table('formula')
                        ->join('receta','receta.formula_id_formula','=','formula.id_formula')
                        ->select(
                            'formula.*',
                            DB::raw('count(receta.id_receta) as medicamentos_asociados')
                        )
                        ->where('formula.id_formula',$id)
                        ->groupBy('formula.id_formula')
                        ->orderBy('formula.fecha_formula','desc')
                        ->get();
            return response()->json($data, 200);
        }

        return response()->json([
            'error' => 'No se han encontrados datos de la formula'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
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
        $message  = DB::table('formula')->where('id_formula', $id)
                                        ->delete();
        return response()->json($message);
    }
}
