<?php

require_once __DIR__ . "/../../clases/Personaje.php";
require_once __DIR__ . "/../../utils/debug.php";

$personaje = new Personaje($_GET);
$resultado = $personaje->Registrar_Personaje();
echo json_encode($resultado);

?>

