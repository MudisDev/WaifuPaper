<?php
require_once __DIR__ . "/../../clases/Personaje.php";

$id_personaje = $_GET['id_personaje'];
$id_personalidad = $_GET['id_personalidad'];

$personaje = new Personaje(["id_personaje" => $id_personaje]);
$resultado = $personaje->Asignar_Personalidad($id_personalidad);
echo json_encode($resultado);

?>