<?php

require_once '../../clases/Lista.php';

require_once __DIR__ . '/../../utils/debug.php';

$tabla = $_GET['tabla'];
$lista = new Lista();
$resultado = $lista->Consultar_Total($tabla);
echo json_encode($resultado);

?>