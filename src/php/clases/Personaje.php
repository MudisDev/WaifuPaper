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
        //$resultado = $conexion->SetSelect("Personaje", ["*"], $condiciones);
        $resultado = $conexion->SetSelect("Vista_Perfil_Personaje", ["*"], $condiciones);
        return $resultado;
        /* if (!isset($resultado['Error']))
            $this->Set_Perfil($resultado); */

    }

    public function Registrar_Personaje()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert(
            "Personaje",
            ["nombre", "alias", "descripcion", "historia", "pasatiempo", "ocupacion", "dia", "mes", "edad", "id_especie", "imagen_perfil"],
            [
                $this->nombre,
                $this->alias,
                $this->descripcion,
                $this->historia,
                $this->pasatiempo,
                $this->ocupacion,
                $this->dia,
                $this->mes,
                $this->edad,
                $this->id_especie,
                $this->imagen_perfil
            ]
        );
        return $resultado;




        /*       id_personaje INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(40) NOT NULL,
          alias VARCHAR(30) NOT NULL,
          descripcion TEXT NOT NULL,
          historia TEXT NOT NULL,
          pasatiempo TEXT NOT NULL,
          ocupacion VARCHAR(40) NOT NULL,
          dia INT NOT NULL,
          mes INT NOT NULL,
          edad INT NOT NULL,
          id_especie INT NOT NULL,
          imagen_perfil TEXT NOT NULL,
          FOREIGN KEY (id_especie) REFERENCES Especie (id_especie) */
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