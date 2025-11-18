<?php

require_once __DIR__ . "/Conexion.php";

class Imagen_Personaje
{

    private $id_imagen = null;
    private $id_personaje = null;

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
        $resultado = $conexion->SetInsert("Aparece_En", ["id_imagen", "id_personaje"], [$this->id_imagen, $this->id_personaje]);
        return $resultado;
    }
}

?>