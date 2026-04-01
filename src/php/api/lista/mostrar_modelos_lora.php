<?php

require_once __DIR__ . "/../../utils/debug.php";
require_once __DIR__ . "/../../clases/Lista.php";

$lista = new Lista();
$lista->Consultar_Modelos_Lora();
$resultado = $lista->Get_Lista();

echo json_encode($resultado);
?>