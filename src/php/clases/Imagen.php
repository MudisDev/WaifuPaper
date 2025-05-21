<?php
require_once 'Conexion.php';

class Imagen
{
    private $id_imagen = null;
    private $url = null;
    private $api_origen = null;
    private $artista = null;
    private $clasificacion = null;
    private $url_fuente = null;
    private $fecha_insercion = null;
    private $fecha_actualizacion = null;
    private $id_imagen_api = null;

    private $array_insert = [
        "url",
        "api_origen",
        "artista",
        "clasificacion",
        "url_fuente",
        /* "fecha_insercion",
        "fecha_actualizacion", */
        "id_imagen_api",
    ];

    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Registrar_Imagen()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert(
            "Imagen",
            $this->array_insert,
            [
                $this->url,
                $this->api_origen,
                $this->artista,
                $this->clasificacion,
                $this->url_fuente,
                /*  $this->fecha_insercion,
                 $this->fecha_actualizacion, */
                $this->id_imagen_api,
            ]
        );
        return $resultado;
    }

    public function Imagen_Existe()
    {
        // Escapamos los valores para seguridad
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Imagen", ["*"], "id_imagen_api = '$this->id_imagen_api' AND api_origen = '$this->api_origen'");

        return $resultado;
    }

    public function Consultar_Etiquetas()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Tiene_Etiqueta", ["id_etiqueta", "nombre_etiqueta"], "id_imagen = '$this->id_imagen'");
        return $resultado;
    }

}
