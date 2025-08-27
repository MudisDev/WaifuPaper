<?php

require_once '../../clases/Token.php';

$id_usuario = $_GET['id_usuario'];
$token = new Token();
$resultado = $token->Eliminar_Token($id_usuario);
echo json_encode($resultado);
?>