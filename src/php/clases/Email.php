<?php

// Incluir PHPMailer desde vendor
require __DIR__ . '/../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require __DIR__ . '/../vendor/phpmailer/phpmailer/src/SMTP.php';
require __DIR__ . '/../vendor/phpmailer/phpmailer/src/Exception.php';

class Email
{

    // Crear instancia
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer\PHPMailer\PHPMailer(true);

        // Configuración de MailHog
        $this->mail->isSMTP();
        $this->mail->Host = 'localhost';
        $this->mail->Port = 1025;
        $this->mail->SMTPAuth = false;
        $this->mail->SMTPSecure = '';
    }

    public function Set_Datos($destinatario, $asunto, $cuerpo, $usuario)
    {
        // Dirección de envío
        $this->mail->setFrom('test@example.com', 'Servidor Local ');
        $this->mail->addAddress($destinatario, $usuario);

        // Contenido
        $this->mail->isHTML(true);
        $this->mail->Subject = $asunto;
        $this->mail->Body = $cuerpo;
        $this->mail->AltBody = $cuerpo;

    }

    public function Enviar_Email()
    {
        try {

            // Enviar
            $this->mail->send();
            echo "Correo enviado ✅. Revisa MailHog en http://localhost:8025";
        } catch (PHPMailer\PHPMailer\Exception $e) {
            echo "Error al enviar: {$this->mail->ErrorInfo}";
        }
    }


}



?>