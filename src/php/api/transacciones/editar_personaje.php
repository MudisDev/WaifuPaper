<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Personaje.php';

$ids_personalidades = explode(",", $_GET['ids_personalidades']);
$ids_personalidades = array_map("intval", $ids_personalidades);

$personaje = new Personaje($_GET);
$resultado = $personaje->Transaccion_Editar_Personaje($ids_personalidades);

echo json_encode($resultado);
?>