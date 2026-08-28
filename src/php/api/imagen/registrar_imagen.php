<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Imagen.php';

$imagen = new Imagen($_GET);
//$busqueda = $imagen->Imagen_Existe();

//if (isset($busqueda["Error"])) {
$resultado = $imagen->Registrar_Imagen();
echo json_encode($resultado);
/* } else {
    echo json_encode(["Warning" => "La imagen ya existe.", "datos" => $busqueda]);
} */

?>