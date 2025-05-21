<?php
require_once 'Conexion.php';

class Lista
{
    private $lista = [];

    public function __construct()
    {

    }

    public function Consultar_Imagenes()
    {
        $condiciones = "clasificacion = 'safe'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Imagen", ["*"], $condiciones);
        //$resultado = $conexion->SetSelect("Vista_Imagenes_Sin_Negativas", ["*"], $condiciones);
        //$resultado = $conexion->SetSelect("Vista_Imagenes_Sin_Negativas", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Favoritas($id_usuario)
    {
        $condicion = "id_usuario = '$id_usuario' AND clasificacion = 'safe'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Favorito", ["*"], $condicion);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Por_Etiqueta($id_etiqueta)
    {
        $condicion = "id_etiqueta = '$id_etiqueta' AND clasificacion = 'safe'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Mostrar_Imagen_Por_Etiqueta", ["*"], $condicion);
        //$resultado = $conexion->SetSelect("Vista_Mostrar_Imagen_Por_Etiqueta_Segura", ["*"], $condicion);
        //$resultado = $conexion->SetSelect("Vista_Mostrar_Imagen_Por_Etiqueta_Segura", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Etiquetas()
    {
        $condiciones = "lista_negra = 0";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Etiqueta", ["*"], $condiciones);
        $this->Set_Lista($resultado);
    }

    public function Set_Lista($datos)
    {
        $this->lista = $datos;
    }

    public function Get_Lista(){
        return $this->lista;
    }
}

?>