<?php

require_once __DIR__ . '/Conexion.php';

class Imagen_Modelo_Lora
{
    private $id_imagen = null;
    private $ids_modelos_lora = null;
    private $prompts_positivos_modelos_lora = null;
    private $prompts_negativos_modelos_lora = null;
    private $fuerza_modelos_lora = null;

    public function __construct($datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Actualizar_Modelos_Lora($conexion)
    {
        $this->Borrar_Modelos_Lora($conexion);
        for ($i = 0; $i < count($this->ids_modelos_lora); $i++)
            $this->Insertar_Modelo_Lora($conexion, $this->ids_modelos_lora[$i], $this->prompts_positivos_modelos_lora[$i], $this->fuerza_modelos_lora[$i], $this->prompts_negativos_modelos_lora[$i]);
    }

    public function Borrar_Modelos_Lora($conexion)
    {
        $resultado = $conexion->Delete("Usa_Modelo_Lora", ["id_imagen = ?"], [], [$this->id_imagen], 'i');
        $this->CheckResultado($resultado);
    }

    public function Insertar_Modelo_Lora($conexion, $id_modelo, $prompt_positivo, $fuerza, $prompt_negativo)
    {
        $resultado = $conexion->Insert("Usa_Modelo_Lora", ["id_imagen", "id_modelo_lora", "prompt_positivo", "fuerza", "prompt_negativo"], [$this->id_imagen, $id_modelo, $prompt_positivo, $fuerza, $prompt_negativo], 'iisds');
        $this->CheckResultado($resultado);
    }

    private function CheckResultado($resultado)
    {
        if (isset($resultado["Error"]))
            throw new Exception($resultado["Error"]);
    }
}

?>