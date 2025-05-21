<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */
require_once '../../clases/Imagen.php';

//?url=urlBv&api_origen=nekospi&artista=Bv&clasificacion=xxx&url_fuente=null&id_imagen_api=Bv
//fecha_insercion=&fecha_actualizacion=&

$imagen  = new Imagen($_GET);
$busqueda = $imagen->Imagen_Existe();

if (isset($busqueda["Error"])) {
    $resultado = $imagen->Registrar_Imagen();
    echo json_encode($resultado);
} else {
    echo json_encode(["Warning" => "La imagen ya existe.", "datos" => $busqueda]);
}

?>