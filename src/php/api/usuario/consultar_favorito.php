<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */
require_once "../../clases/Usuario.php";

$id_usuario = $_GET['id_usuario'];
$id_imagen = $_GET['id_imagen'];

$usuario = new Usuario(["id_usuario" => $id_usuario]);
//$resultado = $usuario->Marcar_Favorito($id_imagen);
$busqueda = $usuario->Favorito_Existe($id_imagen);
if (isset($busqueda["Error"])) {
    echo json_encode(["Error" => "El favorito no existe"]);
    //echo json_encode($resultado);
} else {
    echo json_encode($busqueda);
}
//echo json_encode($resultado);

?>