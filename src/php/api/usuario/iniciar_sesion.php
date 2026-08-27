<?php

require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);
$accesoControlPanel = $data["waifupaperControlPanel"] ?? false;

$usuario = new Usuario($data);
$resultado = $usuario->Iniciar_Sesion();

if (!$accesoControlPanel) {
    echo json_encode($resultado);
    exit;
}

$rol = $usuario->Consultar_Rol();
if (isset($rol['Error'])) {
    echo json_encode(["Error" => "usuario no autorizado"]);
    exit;
}

session_start();
session_regenerate_id(true);
$_SESSION['id_usuario'] = $rol[0]["id_usuario"];
$_SESSION['rol'] = $rol[0]["id_rol"];
echo json_encode(["Success" => "Usuario autorizado"]);

?>