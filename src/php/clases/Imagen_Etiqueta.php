<?php

require_once __DIR__ . '/Conexion.php';
class Imagen_Etiqueta
{

    private $id_imagen = null;
    private $id_etiqueta = null;
    private $ids_etiquetas = [];

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
        $resultado = $conexion->SetInsert("Tiene_Etiqueta", ["id_imagen", "id_etiqueta"], [$this->id_imagen, $this->id_etiqueta]);
        return $resultado;
    }

    public function Actualizar_Etiquetas()
    {
        $conexion = new Conexion();

        try {

            $conexion->BeginTransaction();
            $this->Borrar_Etiquetas($conexion);

            foreach ($this->ids_etiquetas as $id_etiqueta) {
                $this->Insertar_Etiqueta($conexion, $id_etiqueta);
            }

            $conexion->Commit();

            return true;

        } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        }
    }

    public function Borrar_Etiquetas($conexion)
    {
        $condiciones = "id_imagen = '$this->id_imagen'";
        $resultado = $conexion->SetDelete("Tiene_Etiqueta", $condiciones);
        $this->CheckResultado($resultado);
        
    }

    public function Insertar_Etiqueta($conexion, $id_etiqueta)
    {
        $resultado = $conexion->SetInsert("Tiene_Etiqueta", ["id_imagen", "id_etiqueta"], [$this->id_imagen, $id_etiqueta]);
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