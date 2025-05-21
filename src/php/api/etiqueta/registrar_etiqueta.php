<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */
require_once '../../clases/Etiqueta.php';


/* nombre=ejemploBv&api_origen=kakaka */
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