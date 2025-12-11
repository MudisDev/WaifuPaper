<?php

require_once __DIR__ . '/../../clases/Email.php';
require_once __DIR__ . '/../../utils/debug.php';

header('Content-Type: application/json');

$id_usuario = $_GET['id_usuario'];
$token = $_GET['token'];
$user_email = $_GET['email'];
$asunto = 'Recuperacion de cuenta';

$cuerpo = "Hola,<br><br>
Hemos recibido una solicitud para recuperar tu cuenta.<br><br>
Aquí tienes tu información temporal:<br>
- Token de recuperación: $token<br><br>
Usa este token dentro de la app para continuar con el proceso de recuperación.<br><br>
Si no solicitaste este procedimiento, simplemente ignora este mensaje.<br><br>
Atentamente,<br>
Equipo de WaifuPaper 😼💗";

$username = $_GET['username'];

$email = new Email();
$email->Set_Datos($user_email, $asunto, $cuerpo, $username);
$resultado = $email->Enviar_Email();
echo json_encode($resultado);
?>