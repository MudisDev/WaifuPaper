<?php

require_once 'Conexion.php';

class Etiqueta
{
    private $id_etiqueta = null;
    private $nombre = null;
    private $api_origen = null;

    private $array_insert = [
        "nombre",
        "api_origen"
    ];

    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Registrar_Etiqueta()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert("Etiqueta", $this->array_insert, [
            $this->nombre,
            $this->api_origen
        ]);
        return $resultado;
    }

    public function Etiqueta_Existe()
    {
        // Escapamos los valores para seguridad
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Etiqueta", ["*"], "nombre = '$this->nombre' AND api_origen = '$this->api_origen'");
        return $resultado;
    }
}
?>