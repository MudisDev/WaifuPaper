<?php

require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../clases/Imagen_Etiqueta.php';

$id_imagen = $_GET["id_imagen"];

$ids_etiquetas = explode(",", $_GET["ids_etiquetas"]);
$ids_etiquetas = array_map('intval', $ids_etiquetas);

//$relacion = new Imagen_Etiqueta($_GET);
$relacion = new Imagen_Etiqueta(["id_imagen" => $id_imagen, "ids_etiquetas" => $ids_etiquetas]);
$resultado = $relacion->Actualizar_Etiquetas();
echo json_encode($resultado);

?>