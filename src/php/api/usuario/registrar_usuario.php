<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);
$usuario = new Usuario($data);
$resultado = $usuario->RegistrarUsuario();
echo json_encode($resultado);

?>