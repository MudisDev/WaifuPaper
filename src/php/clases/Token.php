<?php

require_once 'Conexion.php';
class Token
{

    private $token = null;
    private $id_token = null;
    private $id_usuario = null;
    private $fecha_token = null;
    public function __construct()
    {

    }

    public function Generar_Token()
    {
        $this->token = bin2hex(random_bytes(32)); // Generar token
    }

    public function Almacenar_Token($id_usuario)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Insert("Sesion_Iniciada", ["id_usuario", "token"], [$id_usuario, $this->token], 'is');
        if (isset($resultado['Success']))
            $this->Consultar_Token($id_usuario, $this->token);
    }

    public function Consultar_Token($id_usuario, $token)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Sesion_Iniciada", ["*"], ["id_usuario = ?", "token = ?"], [$id_usuario, $token], 'is', ["AND"]);
        $this->Set_Token($resultado[0]);
    }

    public function Set_Token(array $datos)
    {
        foreach ($datos as $key => $value)
            if (property_exists($this, $key))
                $this->$key = $value;
    }

    public function Get_Token(): array
    {
        return ['id_token' => $this->id_token, 'id_usuario' => $this->id_usuario, 'token' => $this->token, 'fecha_token' => $this->fecha_token];
    }

    public function Eliminar_Token($id_usuario)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Delete("Sesion_Iniciada", ["id_usuario = ?"], [], [$id_usuario], 'i');
        return $resultado;
    }
}



?>