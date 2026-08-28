<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Lista.php';

$id_usuario = $_GET['id_usuario'];
// $condicion = "id_usuario = '$id_usuario'";

$lista = new Lista();
$lista->Consultar_Imagenes_Favoritas($id_usuario);
$resultado = $lista->Get_Lista();
echo json_encode($resultado);
?>