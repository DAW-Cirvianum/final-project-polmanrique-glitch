<div>
    <div>
        <h2>Hola {{ $user->name }},</h2>

        <p>Has solicitado restablecer tu contraseña.</p>

        <p>
            Haz clic en el siguiente enlace para crear una nueva contraseña:
        </p>

        <a href="{{ $resetUrl }}"
            style="display:inline-block;margin-top:10px;padding:10px 20px;background:#10B981;color:white;text-decoration:none;border-radius:5px;">
            Restablecer contraseña
        </a>

        <p style="margin-top:10px;">Si no solicitaste este cambio, ignora este correo.</p>
    </div>

</div>