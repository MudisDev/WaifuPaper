<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Lista.php';

$tabla = $_GET['tabla'];
$lista = new Lista();
$resultado = $lista->Consultar_Total($tabla);
echo json_encode($resultado);
?>