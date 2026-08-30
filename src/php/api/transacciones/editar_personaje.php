<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Personaje.php';

$data = json_decode(file_get_contents("php://input"), true);

$ids_personalidades = array_map("intval", $data["ids_personalidades"]);

$personaje = new Personaje($data);
$resultado = $personaje->Transaccion_Editar_Personaje($ids_personalidades);

echo json_encode($resultado);
?>