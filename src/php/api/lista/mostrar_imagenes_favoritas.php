<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */
require_once '../../clases/Lista.php';

$id_usuario = $_GET['id_usuario'];
// $condicion = "id_usuario = '$id_usuario'";

$lista = new Lista();
$lista->Consultar_Imagenes_Favoritas($id_usuario);
$resultado = $lista->Get_Lista();
echo json_encode($resultado);

?>