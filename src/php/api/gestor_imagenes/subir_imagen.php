<?php
require_once __DIR__ . '/../../utils/debug.php';
require_once __DIR__ . '/../../utils/headers.php';
require_once __DIR__ . '/../../clases/Gestor_Imagenes.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_personaje = $_POST['id_personaje'] ?? '';

    $gestor_imagenes = new Gestor_Imagenes(["id_personaje" => $id_personaje, "imagen_perfil" => $_FILES['imagen_perfil']]);
    $gestor_imagenes->Normalizar_Ruta();
    $gestor_imagenes->Crear_Directorio();
    $resultado = $gestor_imagenes->Subir_Imagen();

    echo json_encode($resultado);

} else {
    http_response_code(405);
    echo json_encode(["Error" => "Método no permitido"]);
    exit;
}