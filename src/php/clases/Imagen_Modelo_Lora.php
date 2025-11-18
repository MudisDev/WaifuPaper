<?php

require_once __DIR__ . '/Conexion.php';

class Imagen_Modelo_Lora
{
    private $id_imagen = null;
    private $id_modelo_lora = null;
    private $prompt = null;
    private $fuerza = null;

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
        $resultado = $conexion->SetInsert(
            "Usa_Modelo_Lora",
            ["id_imagen", "id_modelo_lora", "prompt", "fuerza"],
            [$this->id_imagen, $this->id_modelo_lora, $this->prompt, $this->fuerza]
        );
        return $resultado;
    }

}

?>