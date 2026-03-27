<?php

require_once __DIR__ . '/../../utils/debug.php';

require_once '../../clases/Imagen.php';

$imagen = new Imagen($_GET);
$resultado = $imagen->Buscar_Imagen();
echo json_encode($resultado);
//print_r($resultado);

?>