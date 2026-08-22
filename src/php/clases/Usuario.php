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
        $resultado = $conexion->RegistrarCuenta(
            "Usuario",
            $this->array_insert,
            [$this->nombre, $this->username, $this->email, $this->password, $this->genero, $this->telefono, $this->foto_perfil],
            "sssssss"
        );
        return $resultado;
    }

    public function Iniciar_Sesion()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Login("Usuario", ["*"], ["username = ?"], [$this->username, $this->password], 'ss');
        if (!isset($resultado['Error'])) {
            $this->Set_Datos($resultado[0]);
        }
        return $resultado;
    }

    public function Set_Datos(array $datos)
    {
        foreach ($datos as $key => $value)
            if (property_exists($this, $key))
                $this->$key = $value;
    }

    public function Marcar_Favorito($id_imagen)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Insert("Favorito", ["id_usuario", "id_imagen"], [$this->id_usuario, $id_imagen], 'ii');
        return $resultado;
    }

    public function Favorito_Existe($id_imagen)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Favorito", ["*"], ["id_usuario = ?", "id_imagen = ?"], [$this->id_usuario, $id_imagen], 'ii', ["AND"]);
        return $resultado;
    }

    public function Borrar_Favorito($id_imagen)
    {
        $conexion = new Conexion();
        $resultado = $conexion->Delete("Favorito", ["id_usuario = ?", "id_imagen = ?"], ["AND"], [$this->id_usuario, $id_imagen], 'ii');
        return $resultado;
    }

    public function Username_Existe()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Usuario", ["*"], ["username = ?"], [$this->username], 's');
        $conexion->cerrarConexion();
        return $resultado;
    }
    public function Email_Existe()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Usuario", ["*"], ["email = ?"], [$this->email], 's');
        $conexion->cerrarConexion();
        return $resultado;
    }
    public function Telefono_Existe()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Usuario", ["*"], ["telefono = ?"], [$this->telefono], 's');
        $conexion->cerrarConexion();
        return $resultado;
    }

    public function Eliminar_Cuenta()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Delete("Usuario", ["id_usuario = ?"], [], [$this->id_usuario], 'i');
        return $resultado;
    }
    public function Actualizar_Perfil()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Update("Usuario", ["id_usuario = ?"], [], ["nombre", "email", "genero"], [$this->nombre, $this->email, $this->genero, $this->id_usuario], 'sssi');
        return $resultado;
    }

    public function Buscar_Email()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select('Usuario', ["email", "id_usuario"], ["username = ?"], [$this->username], 's');
        return $resultado;
    }

    public function Actualizar_Password()
    {
        if (!$this->password)
            return ["Error" => "Contraseña nula"];
        $hashed_password = password_hash($this->password, PASSWORD_DEFAULT);

        $conexion = new Conexion();
        $resultado = $conexion->Update("Usuario", ["id_usuario = ?"], [], ["password"], [$hashed_password, $this->id_usuario], 'si');
        return $resultado;
    }

    public function Consultar_Rol()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("tiene_rol", ["*"], ["id_usuario = ?"], [$this->id_usuario], 'i');
        return $resultado;
    }
}
?>