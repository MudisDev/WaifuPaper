<?php

require_once __DIR__ . '/../../clases/Email.php';

$destinatario = $_GET['destinatario'];
$asunto = $_GET['asunto'];
$cuerpo = $_GET['cuerpo'];
$usuario = $_GET['usuario'];

$email = new Email();
$email->Set_Datos($destinatario, $asunto, $cuerpo, $usuario);
$email->Enviar_Email();
?>