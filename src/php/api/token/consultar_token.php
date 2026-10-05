<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Token.php';
require_once __DIR__ . '/../../clases/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);

$id_usuario = $data['id_usuario'];
$token_recibido = $data['token'];

$token = new Token();
$token->Consultar_Token($id_usuario, $token_recibido);

$resultado = $token->Get_Token();

if (isset($resultado['Error'])) {
    echo json_encode($resultado);
    exit;
}

$usuario = new Usuario(["id_usuario" => $id_usuario]);
$resultado = $usuario->Consultar_Perfil();
echo json_encode($resultado);
?>