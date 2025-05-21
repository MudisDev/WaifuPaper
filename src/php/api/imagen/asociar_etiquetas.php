<?php
require '../../clases/Conexion.php';
require '../../clases/Imagen.php';
require '../../clases/Etiqueta.php';

$id_imagen_api = $_GET['id_imagen_api'];
$api_origen = $_GET['api_origen'];
$etiquetas_raw = $_GET['etiquetas'];
$etiquetas = explode(",", $etiquetas_raw); // ['neko', 'catgirl', 'cute']

$imagen = new Imagen(['id_imagen_api' => $id_imagen_api, 'api_origen' => $api_origen]);
$resultado = $imagen->Imagen_Existe();

if (!$resultado || isset($resultado['Error'])) {
    echo json_encode(['Error' => 'La imagen no existe']);
    exit;
}

$id_imagen_asociar = $resultado[0]['id_imagen'];
$response['id_imagen'] = $id_imagen_asociar;
$response['asociaciones'] = [];

foreach ($etiquetas as $nombre_etiqueta) {
    $etiqueta = new Etiqueta(['api_origen' => $api_origen, 'nombre' => $nombre_etiqueta]);
    $busqueda = $etiqueta->Etiqueta_Existe();

    if (!isset($busqueda['Error'])) {
        $id_etiqueta_asociar = $busqueda[0]['id_etiqueta'];
        $conexion = new Conexion();
        $insercion = $conexion->SetInsert("Tiene_Etiqueta", ["id_imagen", "id_etiqueta"], [$id_imagen_asociar, $id_etiqueta_asociar]);
        $conexion->cerrarConexion();

        $response['asociaciones'][] = [
            'etiqueta' => $nombre_etiqueta,
            'resultado' => $insercion
        ];
    } else {
        $response['asociaciones'][] = [
            'etiqueta' => $nombre_etiqueta,
            'error' => "Etiqueta no registrada"
        ];
    }
}

echo json_encode($response);
?>