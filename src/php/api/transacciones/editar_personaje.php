<?php

require_once __DIR__ . "/../../clases/Personaje.php";
require_once __DIR__ . "/../../utils/debug.php";


$ids_personalidades = explode(",", $_GET['ids_personalidades']);
$ids_personalidades = array_map("intval", $ids_personalidades);

$personaje = new Personaje($_GET);
$resultado = $personaje->Transaccion_Editar_Personaje($ids_personalidades);

echo json_encode($resultado);
/* id_personaje: String(editWaifu?.id_personaje),
nombre: editWaifu?.nombre,
alias: editWaifu?.alias,
descripcion: editWaifu?.descripcion,
historia: editWaifu?.historia,
pasatiempo: editWaifu?.pasatiempo,
ocupacion: editWaifu?.ocupacion,
dia: editWaifu?.dia,
mes: editWaifu?.mes,
edad: editWaifu?.edad,
//imagen_perfil: editWaifu?.profilePhoto || ''
imagen_perfil: editWaifu.imagen,
ids_personalidades: personalidades, */


?>