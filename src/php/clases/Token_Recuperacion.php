<?php

require_once __DIR__ . "/Conexion.php";

class Token_Recuperacion
{
    private $token = null;
    private $id_usuario = null;

    public function __construct($id_usuario)
    {
        $this->id_usuario = $id_usuario;
    }
    public function Generar_Token()
    {
        $this->token = rand(111111, 999999);
    }

    public function Get_Token()
    {
        return $this->token;
    }

    public function Insertar_Token()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Insert("Token_Recuperacion", ["id_usuario", "token"], [$this->id_usuario, $this->token], 'is');
        return $resultado;
    }

    public function Validar_Token($token)
    {
        $token_varchar = (string) $token;
        $conexion = new Conexion();
        $resultado = $conexion->Update("Token_Recuperacion", ["token = ?", "id_usuario = ?", "token_usado = ?"], ["AND", "AND"], ["token_usado"], [1, $token_varchar, $this->id_usuario, 0], 'isii');
        return $resultado;
    }
}
?>