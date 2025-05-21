<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */
require_once '../../clases/Lista.php';

$id_etiqueta = $_GET['id_etiqueta'];
// $condicion = "id_usuario = '$id_usuario'";

$lista = new Lista();
$lista->Consultar_Imagenes_Por_Etiqueta($id_etiqueta);
$resultado = $lista->Get_Lista();
echo json_encode($resultado);

?>