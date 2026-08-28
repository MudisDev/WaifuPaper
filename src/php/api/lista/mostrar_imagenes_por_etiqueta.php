<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Lista.php';

$id_etiqueta = $_GET['id_etiqueta'];
// $condicion = "id_usuario = '$id_usuario'";

$lista = new Lista();
$lista->Consultar_Imagenes_Por_Etiqueta($id_etiqueta);
$resultado = $lista->Get_Lista();
echo json_encode($resultado);
?>