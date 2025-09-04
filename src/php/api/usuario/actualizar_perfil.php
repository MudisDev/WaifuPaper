<?php

require_once '../../clases/Usuario.php';

$usuario = new Usuario($_GET);
$resultado = $usuario->Actualizar_Perfil();
json_encode($resultado);

?>