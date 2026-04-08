<?php

require_once __DIR__ . '/Conexion.php';

class Imagen_Modelo_Lora
{
    private $id_imagen = null;
    private $id_modelo_lora = null;
    private $prompt = null;
    private $fuerza = null;
    private $ids_modelos_lora = null;
    private $prompts_modelos_lora = null;
    private $fuerza_modelos_lora = null;

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


    public function Actualizar_Modelos_Lora($conexion)
    {
        //$conexion = new Conexion();

        /* try { */

        //$conexion->BeginTransaction();
        $this->Borrar_Modelos_Lora($conexion);

        /* foreach ($this->ids_modelos_lora as $id_modelo) {
            $this->Insertar_Modelo_Lora($conexion, $id_modelo);
        } */
        $i = null;
        for ($i = 0; $i < count($this->ids_modelos_lora); $i++) {
            $this->Insertar_Modelo_Lora($conexion, $this->ids_modelos_lora[$i], $this->prompts_modelos_lora[$i], $this->fuerza_modelos_lora[$i]);
        }

        //$conexion->Commit();

        //return true;

        /* } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        } */
    }

    public function Borrar_Modelos_Lora($conexion)
    {
        $condiciones = "id_imagen = '$this->id_imagen'";
        $resultado = $conexion->SetDelete("Usa_Modelo_Lora", $condiciones);
        $this->CheckResultado($resultado);

    }

    public function Insertar_Modelo_Lora($conexion, $id_modelo, $prompt, $fuerza)
    {
        $resultado = $conexion->SetInsert("Usa_Modelo_Lora", ["id_imagen", "id_modelo_lora", "prompt", "fuerza"], [$this->id_imagen, $id_modelo, $prompt, $fuerza]);
        $this->CheckResultado($resultado);
    }

    private function CheckResultado($resultado)
    {
        if (isset($resultado["Error"])) {
            throw new Exception($resultado["Error"]);
        }
    }

}

?>