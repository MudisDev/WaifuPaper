<?php

require_once 'Conexion.php';
class Token
{

    private $token = null;

    public function __construct()
    {

    }

    public function Generar_Token()
    {
        $this->token = bin2hex(random_bytes(32)); // Generar token
    }

    public function Almacenar_Token($id_usuario)
    {
        $condiciones = null;
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert("Sesion_Iniciada", ["id_usuario", "token"], [$id_usuario, $this->token]);
        return $resultado;
    }

    public function Consultar_Token()
    {
        $condiciones = null;
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Sesion_Iniciada", ["*"], $condiciones);
        return $resultado;
    }
    public function Obtener_Token(): string
    {
        return $this->token;
    }

    public function Eliminar_Token()
    {
        $condiciones = null;
        $conexion = new Conexion();
        $resultado = $conexion->SetDelete("Sesion_Iniciada", $condiciones);
        return $resultado;
    }
}



?>