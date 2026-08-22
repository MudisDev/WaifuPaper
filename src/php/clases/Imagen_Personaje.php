<?php

require_once __DIR__ . "/Conexion.php";

class Imagen_Personaje
{

    private $id_imagen = null;
    private $ids_personajes = null;

    public function __construct($datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Actualizar_Personajes($conexion)
    {
            $this->Borrar_Personajes($conexion);
            foreach ($this->ids_personajes as $id_personaje) 
                $this->Insertar_Personaje($conexion, $id_personaje);
    }

    public function Borrar_Personajes($conexion)
    {
        $resultado = $conexion->SetDelete("Aparece_En", ["id_imagen = ?"], [], [$this->id_imagen], 'i');
        $this->CheckResultado($resultado);   
    }


    public function Insertar_Personaje($conexion, $id_personaje)
    {
        $resultado = $conexion->SetInsert("Aparece_En", ["id_imagen", "id_personaje"], [$this->id_imagen, $id_personaje], 'ii');
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