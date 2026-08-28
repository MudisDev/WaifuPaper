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
        $conexion = new Conexion();
        $resultado = $conexion->Select("Vista_Perfil_Personaje", ["*"], ["id_personaje = ?"], [$this->id_personaje], 'i');
        return $resultado;
    }

    public function Registrar_Personaje($conexion_compartida)
    {
        $resultado = $conexion_compartida->Insert(
            "Personaje",
            ["nombre", "alias", "descripcion", "historia", "pasatiempo", "ocupacion", "dia", "mes", "edad", "id_especie", "imagen_perfil"],
            [$this->nombre, $this->alias, $this->descripcion, $this->historia, $this->pasatiempo, $this->ocupacion, $this->dia, $this->mes, $this->edad, $this->id_especie, $this->imagen_perfil],
            'ssssssiiiis'
        );
        return $resultado;
    }

    public function Asignar_Personalidad($id_personalidad)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Insert("Tiene_Personalidad", ["id_personaje", "id_personalidad"], [$this->id_personaje, $id_personalidad], 'ii');
        return $resultado;
    }

    public function Editar_Perfil()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Update(
            "Personaje",
            ["id_personaje = ?"],
            [],
            ["nombre", "alias", "descripcion", "historia", "pasatiempo", "ocupacion", "dia", "mes", "edad", "imagen_perfil"],
            [$this->nombre, $this->alias, $this->descripcion, $this->historia, $this->pasatiempo, $this->ocupacion, $this->dia, $this->mes, $this->edad, $this->imagen_perfil, $this->id_personaje],
            'ssssssiiisi'
        );
        return $resultado;
    }

    public function Editar_Personaje($conexion_compartida)
    {
        $resultado = $conexion_compartida->Update(
            "Personaje",
            ["id_personaje = ?"],
            [],
            ["nombre", "alias", "descripcion", "historia", "pasatiempo", "ocupacion", "dia", "mes", "edad", "id_especie", "imagen_perfil"],
            [$this->nombre, $this->alias, $this->descripcion, $this->historia, $this->pasatiempo, $this->ocupacion, $this->dia, $this->mes, $this->edad, $this->id_especie, $this->imagen_perfil, $this->id_personaje],
            'ssssssiiiisi'
        );
        return $resultado;
    }

    public function Transaccion_Registro_Personaje($ids_personalidades)
    {
        $conexion = new Conexion();
        try {
            $conexion->BeginTransaction();
            $resultado = $this->Registrar_Personaje($conexion);

            $this->CheckResultado($resultado);
            $this->id_personaje = $resultado['id_generado'];

            $this->Actualizar_Personalidades($conexion, $ids_personalidades);
            $conexion->Commit();
            return true;
        } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        }
    }

    public function Transaccion_Editar_Personaje($ids_personalidades)
    {
        $conexion = new Conexion();
        try {
            $conexion->BeginTransaction();
            $this->Editar_Personaje($conexion);
            $this->Actualizar_Personalidades($conexion, $ids_personalidades);
            $conexion->Commit();
            return true;
        } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        }
    }

    public function Actualizar_Personalidades($conexion, $ids_personalidades)
    {
        $this->Borrar_Personalidades($conexion);
        foreach ($ids_personalidades as $id_personalidad)
            $this->Asignar_Personalidades($conexion, $id_personalidad);
    }

    public function Borrar_Personalidades($conexion)
    {
        $resultado = $conexion->Delete("Tiene_Personalidad", ["id_personaje = ?"], [], [$this->id_personaje], 'i');
        $this->CheckResultado($resultado);
    }

    public function Asignar_Personalidades($conexion, $id_personalidad)
    {
        $resultado = $conexion->Insert("Tiene_Personalidad", ["id_personaje", "id_personalidad"], [$this->id_personaje, $id_personalidad], 'ii');
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