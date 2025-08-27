<?php

require_once '../../clases/Token.php';

$id_usuario = $_GET['id_usuario'];
$token = $_GET['token'];

$token = new Token();
$resultado = $token->Consultar_Token($id_usuario, $token);
echo json_encode($resultado);

?>