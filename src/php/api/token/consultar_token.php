<?php

require_once '../../clases/Token.php';

$id_usuario = $_GET['id_usuario'];
$token_recibido = $_GET['token'];

$token = new Token();
$token->Consultar_Token($id_usuario, $token_recibido);
$resultado = $token->Get_Token();
echo json_encode($resultado);

?>