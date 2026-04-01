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
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Imagen", ["*"]);
        //$resultado = $conexion->SetSelect("Vista_Imagenes_Sin_Negativas", ["*"], $condiciones);
        //$resultado = $conexion->SetSelect("Vista_Imagenes_Sin_Negativas", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Favoritas($id_usuario)
    {
        $condicion = "id_usuario = '$id_usuario'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Favorito", ["*"], $condicion);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Personaje($id_personaje)
    {
        $condicion = "id_personaje = '$id_personaje'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Mostrar_Imagenes_Por_Personaje", ["*"], $condicion);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Por_Etiqueta($id_etiqueta)
    {
        $condicion = "id_etiqueta = '$id_etiqueta'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Mostrar_Imagen_Por_Etiqueta", ["*"], $condicion);
        //$resultado = $conexion->SetSelect("Vista_Mostrar_Imagen_Por_Etiqueta_Segura", ["*"], $condicion);
        //$resultado = $conexion->SetSelect("Vista_Mostrar_Imagen_Por_Etiqueta_Segura", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Etiquetas()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Etiqueta", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Personajes()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Personaje", ["*"]);
        //$resultado = $conexion->SetSelect("Vista_Perfil_Personaje", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Set_Lista($datos)
    {
        $this->lista = $datos;
    }

    public function Get_Lista()
    {
        return $this->lista;
    }

    public function Consultar_Especies()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Especie", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Personalidades()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Personalidad", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Total($tabla)
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetCount($tabla);
        return $resultado;
    }
    public function Consultar_Modelos_Base()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("modelo_base", ["*"]);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Modelos_Lora()
    {
        $conexion = new Conexion();
        //$condiciones = "id_imagen = '$id_imagen'";
        $resultado = $conexion->SetSelect("modelo_lora", ["*"], /* $condiciones */);
        $this->Set_Lista($resultado);
    }

    public function Consultar_Modelos_Lora_Por_Imagen($id_imagen)
    {
        $conexion = new Conexion();
        $condiciones = "id_imagen = '$id_imagen'";
        $resultado = $conexion->SetSelect("usa_modelo_lora", ["*"], $condiciones);
        $this->Set_Lista($resultado);
    }

}

?>