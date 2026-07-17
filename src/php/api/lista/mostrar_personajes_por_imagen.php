<?php
require_once __DIR__ . "/../../utils/debug.php";
require_once __DIR__ . "/../../clases/Lista.php";
/* require_once __DIR__ . "/../../utils/headers.php"; */

$id_imagen = $_GET['id_imagen'];

$lista = new Lista();
$lista->Consultar_Personajes_Por_Imagen($id_imagen);
$resultado = $lista->Get_Lista();

echo json_encode($resultado);

?>