<?php

// Incluir PHPMailer desde vendor
require __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require __DIR__ . '/vendor/phpmailer/phpmailer/src/SMTP.php';
require __DIR__ . '/vendor/phpmailer/phpmailer/src/Exception.php';

class Email
{

    // Crear instancia
    private $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    public function __construct()
    {
        $this->mail->isSMTP();
        $this->mail->Host = 'localhost';
        $this->mail->Port = 1025;
        $this->mail->SMTPAuth = false;
        $this->mail->SMTPSecure = '';
    }

    public function Set_Datos()
    {
        // Configuración de MailHog
        $this->mail->isSMTP();
        $this->mail->Host = 'localhost';
        $this->mail->Port = 1025;
        $this->mail->SMTPAuth = false;
        $this->mail->SMTPSecure = '';

        // Dirección de envío
        $this->mail->setFrom('test@example.com', 'Servidor Local 🐾');
        $this->mail->addAddress('usuario@example.com', 'Usuario de Prueba');

        // Contenido
        $this->mail->isHTML(true);
        $this->mail->Subject = 'Test MailHog';
        $this->mail->Body = '<b>¡Correo enviado con éxito a MailHog!</b>';
        $this->mail->AltBody = 'Correo enviado con éxito a MailHog';
       
    }

    public function Enviar_Email(){
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