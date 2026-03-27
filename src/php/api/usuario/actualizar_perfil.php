<?php

require_once '../../clases/Usuario.php';
require_once __DIR__ . '/../../utils/debug.php';


$usuario = new Usuario($_GET);
$resultado = $usuario->Actualizar_Perfil();
echo json_encode($resultado);

?>