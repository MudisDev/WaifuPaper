<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Usuario.php';

$username = $_GET['username'];

$usuario = new Usuario(['username' => $username]);
$resultado = $usuario->Buscar_Email();
echo json_encode($resultado);
?>