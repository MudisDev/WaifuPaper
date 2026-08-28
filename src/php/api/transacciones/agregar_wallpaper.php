<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Imagen.php';

$data = json_decode(file_get_contents("php://input"), true);

$ids_etiquetas = array_map('intval', $data["ids_etiquetas"]);
$ids_personajes = array_map('intval', $data["ids_personajes"]);
$ids_modelos_lora = array_map('intval', $data["ids_modelos_lora"]);
$fuerza_modelos_lora = array_map('floatval', $data["fuerza_modelos_lora"]);

$prompts_positivos_modelos_lora = explode("|", $data["prompts_positivos_modelos_lora"]);
$prompts_negativos_modelos_lora = explode("|", $data["prompts_negativos_modelos_lora"]);

$imagen = new Imagen($data);
$resultado = $imagen->Actualizacion_Imagen_Completa($ids_etiquetas, $ids_modelos_lora, $prompts_positivos_modelos_lora, $prompts_negativos_modelos_lora, $fuerza_modelos_lora, $ids_personajes);

echo json_encode($resultado);