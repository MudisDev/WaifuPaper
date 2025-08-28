<?php

require_once '../../clases/Token.php';

$id_usuario = $_GET['id_usuario'];
$token_recibido = $_GET['token'];

$token = new Token();
$resultado = $token->Consultar_Token($id_usuario, $token_recibido);
echo json_encode($resultado);

?>