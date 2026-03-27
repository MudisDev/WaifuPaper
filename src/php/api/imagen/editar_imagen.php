<?php

require_once __DIR__ . "/../../utils/debug.php";

require_once __DIR__ . "/../../clases/Imagen.php";

$imagen = new Imagen($_GET);
$resultado = $imagen->editar_imagen();

echo json_encode($resultado);

?>