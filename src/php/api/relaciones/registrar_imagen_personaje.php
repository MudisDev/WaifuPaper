<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Imagen_Personaje.php';

$relacion = new Imagen_Personaje($_GET);
$resultado = $relacion->Insertar_Relacion();
echo json_encode($resultado);
?>