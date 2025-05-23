<?php
require_once '../../clases/Personaje.php';
require_once '../../utils/debug.php';

$personaje = new Personaje($_GET);
$resultado = $personaje->Buscar_Personaje();
/* $resultado = $personaje->Get_Perfil(); */
echo json_encode($resultado);
?>