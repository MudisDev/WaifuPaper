<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Token.php';

$data = json_decode(file_get_contents("php://input"), true);

$id_usuario = $data['id_usuario'];

$token = new Token();
$token->Generar_Token();
$token->Almacenar_Token($id_usuario);
$resultado = $token->Get_Token();
echo json_encode($resultado);
?>