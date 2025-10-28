<?php

require_once __DIR__ . "/../../utils/debug.php";
require_once __DIR__ . "/../../clases/Personaje.php";

$personaje = new Personaje($_GET);
$resultado = $personaje->Editar_Perfil();
echo json_encode($resultado);
?>