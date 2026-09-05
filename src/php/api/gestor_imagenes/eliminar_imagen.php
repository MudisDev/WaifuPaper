<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Gestor_Imagenes.php';

$data = json_decode(file_get_contents("php://input"), true);

$imagen_perfil = $data['imagen_perfil'];

$gestorImagen = new Gestor_Imagenes(["imagen_perfil" => $imagen_perfil]);
$gestorImagen->Eliminar_Imagen();