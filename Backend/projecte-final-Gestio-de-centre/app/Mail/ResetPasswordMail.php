<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $token;
    public $resetUrl; 


    public function __construct(User $user, string $token)
    {
        $this->user = $user;
        $this->token = $token;

        $this->resetUrl = url("/reset-password/{$this->user->id}?token={$this->token}");
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this
            ->subject('Recuperar contrasenya')
            ->view('message.resetMessage'); 
    }
}
