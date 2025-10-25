<?php

// Incluir PHPMailer desde vendor
require __DIR__ . '/../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require __DIR__ . '/../vendor/phpmailer/phpmailer/src/SMTP.php';
require __DIR__ . '/../vendor/phpmailer/phpmailer/src/Exception.php';

require_once __DIR__ . '/../config/credentials_email.php';

class Email
{

    // Crear instancia
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer\PHPMailer\PHPMailer(true);

        // Configuración de MailHog
        $this->mail->isSMTP();
        $this->mail->Host = EMAIL_HOST;
        $this->mail->Port = EMAIL_PORT;
        $this->mail->SMTPAuth = EMAIL_SMTAUTH;
        $this->mail->SMTPSecure = EMAIL_SMTPSECURE;

    }

    public function Set_Datos($email, $asunto, $cuerpo, $username)
    {
        // Dirección de envío
        $this->mail->setFrom(EMAIL_FROMEMAIL, EMAIL_FROMNAME);
        $this->mail->addAddress($email, $username);

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
            //echo "Correo enviado ✅. Revisa MailHog en http://localhost:8025";
            return ["Success" => "Envio de email exitoso"];
        } catch (PHPMailer\PHPMailer\Exception $e) {
            //echo "Error al enviar: {$this->mail->ErrorInfo}";
            return ["Error" => "Fallo al intentar enviar email"];
        }
    }
}



?>