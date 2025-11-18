<?php

require_once __DIR__ . '/Conexion.php';
class Imagen_Etiqueta
{

    private $id_imagen = null;
    private $id_etiqueta = null;

    public function __construct($datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Insertar_Relacion()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert("Tiene_Etiqueta", ["id_imagen", "id_etiqueta"], [$this->id_imagen, $this->id_etiqueta]);
        return $resultado;
    }

}

?>