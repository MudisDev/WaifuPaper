<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Etiqueta.php';

$nombre = $_GET['nombre'];
$api_origen = $_GET['api_origen'];

$etiqueta = new Etiqueta(["nombre" => $nombre, "api_origen" => $api_origen]);
$busqueda = $etiqueta->Etiqueta_Existe();

if (isset($busqueda["Error"])) {
    $resultado = $etiqueta->Registrar_Etiqueta();
    echo json_encode($resultado);
} else {
    echo json_encode(["Warning" => "La etiqueta ya existe.", "datos" => $busqueda]);
}

?>