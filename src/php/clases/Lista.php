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
        $resultado = $conexion->Select("Imagen");
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Favoritas($id_usuario)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Vista_Favorito", ["*"], ["id_usuario = ?"], [$id_usuario], 'i');
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Personaje($id_personaje)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Vista_Mostrar_Imagenes_Por_Personaje", ["*"], ["id_personaje = ?"], [$id_personaje], 'i');
        $this->Set_Lista($resultado);
    }

    public function Consultar_Imagenes_Por_Etiqueta($id_etiqueta)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Vista_Mostrar_Imagen_Por_Etiqueta", ["*"], ["id_etiqueta = ?"], [$id_etiqueta], 'i');
        $this->Set_Lista($resultado);
    }

    public function Consultar_Etiquetas()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Etiqueta");
        $this->Set_Lista($resultado);
    }

    public function Consultar_Personajes_Por_Imagen($id_imagen)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("vista_aparece_en", ["*"], ["id_imagen = ?"], [$id_imagen], 'i');
        $this->Set_Lista($resultado);
    }

    public function Consultar_Personajes()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Personaje");
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
        $resultado = $conexion->Select("Especie");
        $this->Set_Lista($resultado);
    }

    public function Consultar_Personalidades()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Personalidad");
        $this->Set_Lista($resultado);
    }

    public function Consultar_Total($tabla)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Count($tabla);
        return $resultado;
    }
    public function Consultar_Modelos_Base()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("modelo_base");
        $this->Set_Lista($resultado);
    }

    public function Consultar_Modelos_Lora()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("modelo_lora");
        $this->Set_Lista($resultado);
    }

    public function Consultar_Modelos_Lora_Por_Imagen($id_imagen)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("vista_modelo_lora_imagen", ["*"], ["id_imagen = ?"], [$id_imagen], 'i');
        $this->Set_Lista($resultado);
    }

    public function Consultar_Personalidades_Por_Personaje($id_personaje)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("vista_personaje_personalidad", ["*"], ["id_personaje = ?"], [$id_personaje], 'i');
        $this->Set_Lista($resultado);
    }
}
?>