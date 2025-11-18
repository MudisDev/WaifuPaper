<?php

require_once __DIR__ . '/../../clases/Imagen_Etiqueta.php';
require_once __DIR__ . '/../../utils/debug.php';

$relacion = new Imagen_Etiqueta($_GET);
$resultado = $relacion->Insertar_Relacion();
echo json_encode($resultado);

?>