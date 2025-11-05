<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_personaje = $_POST['id_personaje'] ?? '';

    // Normaliza la raíz y crea la ruta con slash final
    $docRoot = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\');
    $uploadDir = $docRoot . "/waifupaper/wallpapers/" . intval($id_personaje) . "/";

    // Crear directorio si no existe (con permisos y recursivo)
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0777, true) && !is_dir($uploadDir)) {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo crear el directorio"]);
            exit;
        }
    }

    if (isset($_FILES['imagen_perfil']) && $_FILES['imagen_perfil']['error'] === UPLOAD_ERR_OK) {
        $imagen_perfil = basename($_FILES['imagen_perfil']['name']);
        $tmp_name = $_FILES['imagen_perfil']['tmp_name'];

        // Sanitiza nombre de archivo y evita colisiones (opcional timestamp)
        $imagen_perfil = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $imagen_perfil);
        $uniqueName = time() . "_" . $imagen_perfil;

        // Construir ruta final con separator
        $uploadFile = $uploadDir . $uniqueName;

        if (move_uploaded_file($tmp_name, $uploadFile)) {
            // Opcional: cambiar permisos
            chmod($uploadFile, 0644);
            echo json_encode(["success" => true, "path" => $uploadFile, "filename" => $uniqueName]);
            exit;
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al mover el archivo."]);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No se recibió imagen o hubo error de subida."]);
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}