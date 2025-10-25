<?php
#require __DIR__ . '/../../utils/debug.php';
require __DIR__ . '/../../clases/Usuario.php';

$username = $_GET['username'];

$usuario = new Usuario(['username' => $username]);
$resultado = $usuario->Buscar_Email();
echo json_encode($resultado);
?>