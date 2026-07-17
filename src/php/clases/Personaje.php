<?php

use PHPUnit\Framework\TestStatus\Success;

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

    public function Registrar_Personaje($conexion_compartida)
    {
        //$conexion = new Conexion();

        //$resultado = $conexion->SetInsert(
        $resultado = $conexion_compartida->SetInsert(
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

    public function Asignar_Personalidad($id_personalidad)
    {

       $conexion = new Conexion();
        $resultado = $conexion->SetInsert(
            "Tiene_Personalidad",
            ["id_personaje", "id_personalidad"],
            [$this->id_personaje, $id_personalidad]
        );
        return $resultado;
    }

    public function Editar_Perfil()
    {
        $condiciones = "id_personaje = '$this->id_personaje'";
        $conexion = new Conexion();
        $resultado = $conexion->SetUpdate(
            "Personaje",
            "nombre = '$this->nombre',
                alias = '$this->alias',
                descripcion = '$this->descripcion',
                historia = '$this->historia',
                pasatiempo = '$this->pasatiempo',
                ocupacion = '$this->ocupacion',
                dia = '$this->dia',
                mes = '$this->mes',
                edad = '$this->edad',
                imagen_perfil = '$this->imagen_perfil'",
            $condiciones
        );
        return $resultado;
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


    public function Transaccion_Registro_Personaje($ids_personalidades)
    {

        $conexion = new Conexion();




        try {

            $conexion->BeginTransaction();

            $resultado = $this->Registrar_Personaje($conexion);
            if (isset($resultado['Success']))
                $this->id_personaje = $resultado['id_generado'];
            

            //actualizar etiquetas
            $this->Actualizar_Personalidades($conexion, $ids_personalidades);

            //actualizar personajes
            //$imagen_personaje->Actualizar_Personajes($conexion);

            //actualizar loras
            //$imagen_modelo_lora->Actualizar_Modelos_Lora($conexion);

            /*  foreach ($this->ids_etiquetas as $id_etiqueta) {
                 $this->Insertar_Etiqueta($conexion, $id_etiqueta);
             } */

            $conexion->Commit();

            return true;

        } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        }


    }



public function Actualizar_Personalidades($conexion, $ids_personalidades)
    {
        //$conexion = new Conexion();

        /* try { */

            //$conexion->BeginTransaction();
            $this->Borrar_Personalidades($conexion);

            foreach ($ids_personalidades as $id_personalidad) {
                $this->Asignar_Personalidades($conexion, $id_personalidad);
            }

            //$conexion->Commit();

            //return true;

        /* } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        } */
    }

    public function Borrar_Personalidades($conexion)
    {
        $condiciones = "id_personaje = '$this->id_personaje'";
        $resultado = $conexion->SetDelete("Tiene_Personalidad", $condiciones);
        $this->CheckResultado($resultado);
        
    }

    public function Asignar_Personalidades($conexion, $id_personalidad)
    {
        $resultado = $conexion->SetInsert("Tiene_Personalidad", ["id_personaje", "id_personalidad"], [$this->id_personaje, $id_personalidad]);
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