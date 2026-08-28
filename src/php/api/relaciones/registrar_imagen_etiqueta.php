<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Imagen_Etiqueta.php';

$relacion = new Imagen_Etiqueta($_GET);
$resultado = $relacion->Insertar_Relacion();
echo json_encode($resultado);
?>