<?php
require_once __DIR__ . '/../../utils/debug.php';

require_once '../../clases/Usuario.php';

$usuario = new Usuario($_GET);
$resultado = $usuario->Eliminar_Cuenta();
echo json_encode($resultado);

?>