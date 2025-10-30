<?php

require_once __DIR__ . "/../../clases/Usuario.php";
require_once __DIR__ . "/../../utils/debug.php";

$usuario = new Usuario($_GET);
$resultado = $usuario->Actualizar_Password();
echo json_encode($resultado);

?>