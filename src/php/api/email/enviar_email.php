<?php

require_once __DIR__ . '/../../clases/Email.php';
require_once __DIR__ . '/../../utils/debug.php';

header('Content-Type: application/json');

$user_email = $_GET['email'];
$asunto = 'Recuperacion de cuenta';
$cuerpo = 'Luego va a recibir un token en otra actualizacion Bv';
$username = $_GET['username'];

$email = new Email();
$email->Set_Datos($user_email, $asunto, $cuerpo, $username);
$resultado = $email->Enviar_Email();
echo json_encode($resultado);
?>