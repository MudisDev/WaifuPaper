<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Usuario.php';

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