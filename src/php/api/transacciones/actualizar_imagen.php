<?php

require_once __DIR__ . "/../../utils/debug.php";
require_once __DIR__ . "/../../clases/Imagen.php";

$ids_etiquetas = explode(",", $_GET["ids_etiquetas"]);
$ids_etiquetas = array_map('intval', $ids_etiquetas);

$ids_personajes = explode(",", $_GET["ids_personajes"]);
$ids_personajes = array_map('intval', $ids_personajes);

$ids_modelos_lora = explode(",", $_GET["ids_modelos_lora"]);
$ids_modelos_lora = array_map('intval', $ids_modelos_lora);

$prompts_modelos_lora = explode("," , $_GET["prompts_modelos_lora"]);
$fuerza_modelos_lora = explode("," , $_GET["fuerza_modelos_lora"]);

$imagen = new Imagen($_GET);
$resultado = $imagen->Actualizacion_Imagen_Completa($ids_etiquetas, $ids_modelos_lora, $prompts_modelos_lora, $fuerza_modelos_lora, $ids_personajes);

echo json_encode($resultado);

?>