<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Token.php';

$id_usuario = $_GET['id_usuario'];
$token = new Token();
$resultado = $token->Eliminar_Token($id_usuario);
echo json_encode($resultado);
?>