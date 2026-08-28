<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Token_Recuperacion.php';

$id_usuario = $_GET['id_usuario'];
$token = $_GET['token'];

$token_recuperacion = new Token_Recuperacion($id_usuario);
$resultado = $token_recuperacion->Validar_Token($token);
echo json_encode($resultado);
?>