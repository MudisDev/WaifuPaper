<?php

require_once '../../clases/Token.php';

$token = new Token();
$token->Generar_Token();
$resultado = $token->Obtener_Token();
echo json_encode($resultado);
?>