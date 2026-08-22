<?php

function requireLogin()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['id_usuario'])) {
        http_response_code(401);
        echo json_encode(["Error" => "No autenticado"]);
        exit;
    }

    //return $_SESSION['id_usuario'];
    return ['Success' => 'Usuario autenticado', "id_usuario" => $_SESSION['id_usuario'], "rol" => $_SESSION['rol']];
}

?>