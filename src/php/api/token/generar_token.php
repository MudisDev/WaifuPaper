<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Token.php';

$id_usuario = $_GET['id_usuario'];

$token = new Token();
$token->Generar_Token();
$token->Almacenar_Token($id_usuario);
$resultado = $token->Get_Token();
echo json_encode($resultado);
?>