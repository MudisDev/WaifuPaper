<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Lista.php';

$id_personaje = $_GET['id_personaje'];
// $condicion = "id_usuario = '$id_usuario'";

$lista = new Lista();
$lista->Consultar_Imagenes_Personaje($id_personaje);
$resultado = $lista->Get_Lista();
echo json_encode($resultado);
?>