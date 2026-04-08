<?php

require_once __DIR__ . "/Conexion.php";

class Imagen_Personaje
{

    private $id_imagen = null;
    private $id_personaje = null;
    private $ids_personajes = null;

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


    public function Actualizar_Personajes($conexion)
    {
        //$conexion = new Conexion();

        /* try { */

            //$conexion->BeginTransaction();
            $this->Borrar_Personajes($conexion);

            foreach ($this->ids_personajes as $id_personaje) {
                $this->Insertar_Personaje($conexion, $id_personaje);
            }

            //$conexion->Commit();

            //return true;

        /* } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        } */
    }

    public function Borrar_Personajes($conexion)
    {
        $condiciones = "id_imagen = '$this->id_imagen'";
        $resultado = $conexion->SetDelete("Aparece_En", $condiciones);
        $this->CheckResultado($resultado);
        
    }

    public function Insertar_Personaje($conexion, $id_personaje)
    {
        $resultado = $conexion->SetInsert("Aparece_En", ["id_imagen", "id_personaje"], [$this->id_imagen, $id_personaje]);
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