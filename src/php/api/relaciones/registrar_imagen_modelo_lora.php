<?php

require_once __DIR__ . "/../../clases/Imagen_Modelo_Lora.php";
require_once __DIR__ . '/../../utils/debug.php';


$relacion = new Imagen_Modelo_Lora($_GET);
$resultado = $relacion->Insertar_Relacion();

echo json_encode($resultado);

?>