<?php
require_once '../../utils/debug.php';
require_once '../../clases/Usuario.php';


$usuario = new Usuario($_GET);
$resultado = $usuario->Iniciar_Sesion();
echo json_encode($resultado);

?>