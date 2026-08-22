<?php
require_once __DIR__ . '/debug.php';
require_once __DIR__ . '/headers.php';
require_once __DIR__ . '/logout.php';

Cerrar_Sesion();

http_response_code(200);
echo json_encode([
    "Success" => true,
    "message" => "Sesión cerrada"
]);