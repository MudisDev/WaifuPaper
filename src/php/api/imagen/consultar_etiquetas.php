<?php

require_once '../../clases/Imagen.php';

$imagen = new Imagen($_GET);
$resultado = $imagen->Consultar_Etiquetas();
echo json_encode($resultado);
//print_r($resultado);

?>