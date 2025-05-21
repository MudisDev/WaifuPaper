<?php

require_once '../../clases/Usuario.php';
require_once '../../utils/debug.php';

//?nombre=mudisBv2&username=mudis2&email=martin2@rocketmail.com&password=Kazo2&genero=masculino&telefono=4571051235&foto_perfil=FotoBv

$usuario = new Usuario($_GET);
$resultado = $usuario->RegistrarUsuario();
echo json_encode($resultado);

?>