<?php

require_once 'Conexion.php';
class Personaje
{
    private $id_personaje = null;
    private $nombre = null;
    private $alias = null;
    private $descripcion = null;
    private $historia = null;
    private $pasatiempo = null;
    private $ocupacion = null;
    private $dia = null;
    private $mes = null;
    private $edad = null;
    private $id_especie = null;
    private $imagen_perfil = null;

    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Buscar_Personaje()
    {
        $condiciones = "id_personaje = '$this->id_personaje'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Personaje", ["*"], $condiciones);
        return $resultado;
        /* if (!isset($resultado['Error']))
            $this->Set_Perfil($resultado); */

    }
/* 
    public function Set_Perfil(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Get_Perfil()
    {
        $datos[] = [
            'id_personaje' => $this->id_personaje,
            'nombre' => $this->nombre,
            'alias' => $this->alias,
            'descripcion' => $this->descripcion,
            'historia' => $this->historia,
            'pasatiempo' => $this->pasatiempo,
            'ocupacion' => $this->ocupacion,
            'dia' => $this->dia,
            'mes' => $this->mes,
            'edad' => $this->edad,
            'id_especie' => $this->id_especie,
            'imagen_perfil' => $this->imagen_perfil,
        ];
        return $datos;
    } */
}

?>