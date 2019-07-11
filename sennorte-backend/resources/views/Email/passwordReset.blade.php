@component('mail::message')
# <strong>Cambiar contraseña</strong>

Estás recibiendo este correo porque hiciste una petición de recuperación de contraseña para tu cuenta

@component('mail::button', [ 'url' => 'http://localhost:4200/auth/reset-password?token='.$token->token ])
Cambiar contraseña
@endcomponent

Si no realizaste esta solicitud, no se requiere realizar ninguna otra acción

Saludos, SENNORTE!
@endcomponent
