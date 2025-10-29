<?php

require_once __DIR__ . "/../../clases/Token_Recuperacion.php";
require_once __DIR__ . "/../../utils/debug.php";

$id_usuario = $_GET['id_usuario'];

$token_recuperacion = new Token_Recuperacion($id_usuario);
$token_recuperacion->Generar_Token();
$resultado = $token_recuperacion->Insertar_Token();
$token = $token_recuperacion->Get_Token();
$respuesta = [$resultado, "token" => $token];
echo json_encode($respuesta);

?>