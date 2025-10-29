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
        $resultado = $conexion->SetInsert("Token_Recuperacion", ["id_usuario", "token"], [$this->id_usuario, $this->token]);
        return $resultado;
    }

    public function Validar_Token($token)
    {
        $token_varchar = (string) $token;
        $columnas_actualizar = "token_usado = 1";
        $condiciones = "token = '$token_varchar' AND id_usuario = '$this->id_usuario'";
        $conexion = new Conexion();
        $resultado = $conexion->SetUpdate("Token_Recuperacion", $columnas_actualizar, $condiciones);
        return $resultado;
    }
}

?>