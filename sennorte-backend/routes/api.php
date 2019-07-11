<?php

Route::group([

    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');

    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    //Procedimientos de usuario
    Route::resource('user', 'UsuarioController');
    Route::post('userAdminPasswordConfirm', 'UsuarioController@validateUserPasswordAdmin');
    Route::put('profileUpdate', 'UsuarioController@updateProfile');
    Route::put('usuarioStatus', 'UsuarioController@changeStatus');

    // Procedimientos de novedades y eventos
    Route::resource('novedad', 'NovedadController');

    // Procedimientos de datos de residente y acudientes
    Route::resource('residente', 'ResidenteController');
    Route::resource('acudiente_controller', 'AcudienteController');
    Route::put('estado_acudiente', 'AcudienteController@cambiar');

        // Listados de residente 
    Route::get('residente_info/{id}', 'ResidenteController@informacionResidente');
        // Cambiar estado residente
    Route::put('residente_status/{id}', 'ResidenteController@changeStatus');

    // Procedimientos macroproceso Medicamentos
    Route::resource('medicamento', 'MedicamentoController');
    Route::put('medicamentoStatus', 'MedicamentoController@changeStatus');
    Route::resource('formula', 'FormulaController');
    Route::resource('receta', 'RecetaController');
    Route::get('searchMedicamento/{medicamento}', 'PeticionController@showMedicamento');

    // PRocedimientos cama y habitacion
    Route::post('guardar', 'PeticionController@store');

    //Procedimientos de eventos
    Route::resource('evento', 'EventoController');
    Route::get('evento_top', 'EventoController@verUltimos');

     // Procedimientos de pagos
    Route::resource('pago', 'PagoController');
    Route::get('pagoInf', 'PagoController@getInfoPago');

    // Peticion de datos para listar
    Route::get('habitaciones', 'PeticionController@showHabitacion');
    Route::get('estado_civil', 'PeticionController@showEstadoCivil');
    Route::get('tipo_aplicacion', 'PeticionController@showTipoAplicacion');
    Route::get('unidad_medida', 'PeticionController@showUnidadMedida');
    Route::get('medicamento_peticion', 'PeticionController@showMedicamentos');
    Route::get('rol', 'PeticionController@showRoles');
    Route::get('cama', 'PeticionController@showCama');
    Route::get('eps', 'PeticionController@showEps');

    // Petición de datos seguimiento diario
    Route::resource('seguimiento', 'SeguimientoDiarioController');
    Route::get('seguimiento/informe/{id}', 'SeguimientoDiarioController@informe');
    Route::get('seguimientoR', 'SeguimientoDiarioController@getResidente');

    //Peticion de datos valoración
    Route::resource('valoracion', 'ValoracionController');
    Route::get('valoracionR', 'ValoracionController@getResidente');
    

    Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

}); 