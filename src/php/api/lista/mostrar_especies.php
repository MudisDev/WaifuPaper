<?php

require_once '../../clases/Lista.php';

require_once __DIR__ . '/../../utils/debug.php';


$lista = new Lista();
$lista->Consultar_Especies();
$resultado = $lista->Get_Lista();
echo json_encode($resultado);

?>