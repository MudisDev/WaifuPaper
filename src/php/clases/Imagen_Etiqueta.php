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
        $resultado = $conexion->Insert("Tiene_Etiqueta", ["id_imagen", "id_etiqueta"], [$this->id_imagen, $this->id_etiqueta], 'ii');
        return $resultado;
    }

    public function Actualizar_Etiquetas($conexion)
    {
            $this->Borrar_Etiquetas($conexion);
            foreach ($this->ids_etiquetas as $id_etiqueta) {
                $this->Insertar_Etiqueta($conexion, $id_etiqueta);
            }
    }

    public function Borrar_Etiquetas($conexion)
    {
        $resultado = $conexion->Delete("Tiene_Etiqueta", ["id_imagen = ?"], [], [$this->id_imagen], 'i');
        $this->CheckResultado($resultado);
    }

    public function Insertar_Etiqueta($conexion, $id_etiqueta)
    {
        $resultado = $conexion->Insert("Tiene_Etiqueta", ["id_imagen", "id_etiqueta"], [$this->id_imagen, $id_etiqueta], 'ii');
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