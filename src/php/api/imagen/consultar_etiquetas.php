<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Imagen.php';

$imagen = new Imagen($_GET);
$resultado = $imagen->Consultar_Etiquetas();
echo json_encode($resultado);
?>