<?php

require_once __DIR__ . "/../../clases/Personaje.php";
require_once __DIR__ . "/../../utils/debug.php";

/* ["nombre", "alias", "descripcion", "historia", "pasatiempo", "ocupacion", "dia", "mes", "edad", "id_especie", "imagen_perfil"], */

$ids_personalidades = explode(",", $_GET['ids_personalidades']);
$ids_personalidades = array_map("intval", $ids_personalidades);

$personaje = new Personaje($_GET);
$resultado = $personaje->Transaccion_Registro_Personaje($ids_personalidades);

echo json_encode($resultado);

/*     
    ID_Especie → "1",
    IDs_Personalidad → "1,2" */

?>