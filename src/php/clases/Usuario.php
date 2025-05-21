<?php

use Dba\Connection;

require_once 'Conexion.php';
class Usuario
{

    private $id_usuario = null;
    private $nombre = null;
    private $username = null;
    private $email = null;
    private $password = null;
    private $genero = null;
    private $telefono = null;
    private $foto_perfil = null;

    private $array_insert = [
        "nombre",
        "username",
        "email",
        "password",
        "genero",
        "telefono",
        "foto_perfil"
    ];


    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function RegistrarUsuario()
    {
        $username_existe = $this->Username_Existe();
        if (!isset($username_existe['Error']))
            return ["Error" => "Username ya existe."];
        $email_existe = $this->Email_Existe();
        if (!isset($email_existe['Error']))
            return ["Error" => "Email ya existe."];
        $telefono_existe = $this->Telefono_Existe();
        if (!isset($telefono_existe['Error']))
            return ["Error" => "Telefono ya existe."];

        $conexion = new Conexion();
        $resultado = $conexion->SetInsert(
            "Usuario",
            $this->array_insert,
            [
                $this->nombre,
                $this->username,
                $this->email,
                $this->password,
                $this->genero,
                $this->telefono,
                $this->foto_perfil
            ]
        );
        return $resultado;
    }

    public function Iniciar_Sesion()
    {
        $condiciones = "username = '$this->username'";
        $conexion = new Conexion();
        //$resultado = $conexion->IniciarSesion("Usuario", ["*"], "username", $this->username, $this->password);
        $resultado = $conexion->SetSelect("Usuario", ["*"], $condiciones, true, $this->password);
        if (!isset($resultado['Error'])) {
            $this->Set_Datos($resultado[0]);
        }
        return $resultado;
    }

    public function Set_Datos(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Marcar_Favorito($id_imagen)
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert("Favorito", ["id_usuario", "id_imagen"], [$this->id_usuario, $id_imagen]);
        return $resultado;
    }

    public function Favorito_Existe($id_imagen)
    {
        // Escapamos los valores para seguridad
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Favorito", ["*"], "id_usuario = '$this->id_usuario' AND id_imagen = '$id_imagen'");

        return $resultado;
    }

    public function Borrar_Favorito($id_imagen)
    {
        $condiciones = "id_usuario = '$this->id_usuario' AND id_imagen = '$id_imagen' ";
        $conexion = new Conexion();
        $resultado = $conexion->SetDelete("Favorito", $condiciones);
        return $resultado;
    }

    public function Username_Existe()
    {
        $condiciones = "username = '$this->username'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Usuario", ["*"], $condiciones);
        $conexion->cerrarConexion();

        return $resultado;
    }
    public function Email_Existe()
    {
        $condiciones = "email = '$this->email'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Usuario", ["*"], $condiciones);
        $conexion->cerrarConexion();

        return $resultado;
    }
    public function Telefono_Existe()
    {
        $condiciones = "telefono = '$this->telefono'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Usuario", ["*"], $condiciones);
        $conexion->cerrarConexion();

        return $resultado;
    }

    public function Eliminar_Cuenta()
    {
        $condiciones = "id_usuario = '$this->id_usuario'";
        $conexion = new Conexion();
        $resultado = $conexion->SetDelete("Usuario", $condiciones);
        return $resultado;
    }
}


?>