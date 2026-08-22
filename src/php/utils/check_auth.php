<?php
require_once __DIR__ . '/debug.php';
require_once __DIR__ . '/headers.php';
require_once __DIR__ . '/auth.php';

$response = requireLogin();
//echo json_encode(['Success' => 'Usuario autenticado']);
echo json_encode($response);
?>