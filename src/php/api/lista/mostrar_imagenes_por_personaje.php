<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */
require_once '../../clases/Lista.php';

$id_personaje = $_GET['id_personaje'];
// $condicion = "id_usuario = '$id_usuario'";

$lista = new Lista();
$lista->Consultar_Imagenes_Personaje($id_personaje);
$resultado = $lista->Get_Lista();
echo json_encode($resultado);

?>