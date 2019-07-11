<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = DB::table('users')
                    ->where('rol','>=',1)
                    ->get();
        return response()->json($usuarios);
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $usuario = DB::table('users')
                    ->where('document',$id)
                    ->get();
        return response()->json($usuario);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
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
        $message = DB::table('users')->where('document',$id)->update([
            'name'          => $request['nombre'],
            'lastname'      => $request['apellido'],
            'email'         => $request['email'],
            'rol'           => $request['rol']
        ]);
        return response()->json($message);
    }

    public function updateProfile(Request $request)
    {
        if ( $request->tipoActualizacion === 1 ) {

            $actualPass = DB::table('users')
                            ->where('document',$request->document)
                            ->select([
                                'password'
                            ])
                            ->get()
                            ->first();
            $requestPass = $request->actual;

            if (Hash::check($requestPass, $actualPass->password)) {
                
                $message = DB::table('users')
                                ->where('document',$request->document)
                                ->update([
                                    'password' => bcrypt($request->nueva)
                                ]);

                if ($message) {
                    return response()->json('Se ha cambiado la contraseña exitosamente', 200);
                } else {
                    return response()->json('No se ha podido cambiar la contraseña', 500);
                }

                return response()->json(true, 200);

            } else {

                return response()->json('La contraseña actual que acaba de ingresar no coincide', 500);

            }

        } 
    }

    public function validateUserPasswordAdmin(Request $request) 
    {
        $admin = DB::table('users')
                    ->where('document',$request->id)
                    ->select([
                        'rol',
                        'password'
                    ])
                    ->get()
                    ->first();

        if ($admin->rol === 1 && Hash::check( $request->password, $admin->password)) {
            return response()->json(true);
        }

        return response()->json(false);
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

    public function changeStatus(Request $request)
    {
        $message = DB::table('users')->where('document',$request['id'])
        ->update([
            'estado'    => $request['status']
        ]);

        return response()->json($message);
    }
}
